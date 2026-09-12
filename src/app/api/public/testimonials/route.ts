import { NextResponse } from "next/server";
import { listPublicTestimonials } from "@/lib/server/business";
export async function GET(){const items=await listPublicTestimonials();return NextResponse.json(items,{headers:{'Cache-Control':'public, s-maxage=300, stale-while-revalidate=600'}})}
