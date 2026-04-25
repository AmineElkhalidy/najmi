import { NextResponse } from "next/server";

type GooglePlaceReview = {
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: {
    text?: string;
  };
  originalText?: {
    text?: string;
  };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
};

type GooglePlaceDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  reviews?: GooglePlaceReview[];
};

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID." },
      { status: 500 }
    );
  }

  const requestUrl = new URL(request.url);
  const locale = requestUrl.searchParams.get("locale") ?? "fr";
  const languageCode = locale === "ar" ? "ar" : locale === "en" ? "en" : "fr";

  const detailsUrl = new URL(
    `https://places.googleapis.com/v1/places/${placeId}`
  );
  detailsUrl.searchParams.set("languageCode", languageCode);

  try {
    const res = await fetch(detailsUrl.toString(), {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "rating,userRatingCount,reviews.rating,reviews.relativePublishTimeDescription,reviews.originalText,reviews.text,reviews.authorAttribution",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json(
        { error: "Google Places API request failed.", details: body },
        { status: res.status }
      );
    }

    const data = (await res.json()) as GooglePlaceDetailsResponse;
    const reviews = (data.reviews ?? []).slice(0, 6).map((review) => ({
      authorName: review.authorAttribution?.displayName ?? "Google user",
      authorUrl: review.authorAttribution?.uri ?? null,
      text: review.text?.text ?? review.originalText?.text ?? "",
      rating: review.rating ?? 5,
      relativeTimeDescription: review.relativePublishTimeDescription ?? "",
    }));

    return NextResponse.json({
      source: "google",
      rating: data.rating ?? null,
      totalReviews: data.userRatingCount ?? 0,
      reviews,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error while fetching Google reviews." },
      { status: 500 }
    );
  }
}
