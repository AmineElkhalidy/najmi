import { NextResponse } from "next/server";

type GooglePlaceDetailsResponse = {
  result?: {
    rating?: number;
    user_ratings_total?: number;
    reviews?: Array<{
      author_name?: string;
      author_url?: string;
      rating?: number;
      relative_time_description?: string;
      text?: string;
    }>;
  };
  status?: string;
  error_message?: string;
  candidates?: Array<{
    place_id?: string;
  }>;
};

function getTextQueryFromValue(value: string) {
  if (value.startsWith("http")) {
    const match = value.match(/\/place\/([^/]+)/i);
    if (match?.[1]) {
      return decodeURIComponent(match[1]).replace(/\+/g, " ");
    }
  }
  return value;
}

async function resolvePlaceId(apiKey: string, rawPlaceValue: string) {
  if (rawPlaceValue.startsWith("ChIJ")) {
    return rawPlaceValue;
  }

  const textQuery = getTextQueryFromValue(rawPlaceValue);
  const findUrl = new URL(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
  );
  findUrl.searchParams.set("input", textQuery);
  findUrl.searchParams.set("inputtype", "textquery");
  findUrl.searchParams.set("fields", "place_id");
  findUrl.searchParams.set("key", apiKey);

  const findRes = await fetch(findUrl.toString(), {
    next: { revalidate: 3600 },
  });

  if (!findRes.ok) {
    return null;
  }

  const findData = (await findRes.json()) as GooglePlaceDetailsResponse;
  return findData.candidates?.[0]?.place_id ?? null;
}

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeValue = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeValue) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID." },
      { status: 500 }
    );
  }

  const requestUrl = new URL(request.url);
  const locale = requestUrl.searchParams.get("locale") ?? "fr";
  const languageCode = locale === "ar" ? "ar" : locale === "en" ? "en" : "fr";

  try {
    const resolvedPlaceId = await resolvePlaceId(apiKey, placeValue);

    if (!resolvedPlaceId) {
      return NextResponse.json(
        {
          error:
            "Unable to resolve a valid Google Place ID from GOOGLE_PLACE_ID. Use a real Place ID (starts with ChIJ) or business name query.",
        },
        { status: 400 }
      );
    }

    const detailsUrl = new URL(
      "https://maps.googleapis.com/maps/api/place/details/json"
    );
    detailsUrl.searchParams.set("place_id", resolvedPlaceId);
    detailsUrl.searchParams.set(
      "fields",
      "rating,user_ratings_total,reviews"
    );
    detailsUrl.searchParams.set("reviews_sort", "newest");
    detailsUrl.searchParams.set("language", languageCode);
    detailsUrl.searchParams.set("key", apiKey);

    const res = await fetch(detailsUrl.toString(), {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: "Google Place Details request failed.", details: body },
        { status: res.status }
      );
    }

    const data = (await res.json()) as GooglePlaceDetailsResponse;

    if (data.status && data.status !== "OK") {
      return NextResponse.json(
        {
          error: `Google Places returned ${data.status}.`,
          details: data.error_message ?? null,
        },
        { status: 400 }
      );
    }

    const reviews = (data.result?.reviews ?? []).slice(0, 6).map((review) => ({
      authorName: review.author_name ?? "Google user",
      authorUrl: review.author_url ?? null,
      text: review.text ?? "",
      rating: review.rating ?? 5,
      relativeTimeDescription: review.relative_time_description ?? "",
    }));

    return NextResponse.json({
      source: "google",
      rating: data.result?.rating ?? null,
      totalReviews: data.result?.user_ratings_total ?? 0,
      reviews,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while fetching Google reviews." },
      { status: 500 }
    );
  }
}
