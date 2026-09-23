import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { directions, ShipDirectionDetail, ShipSite } from "@/components/demo-ship";
import { profileFromQuery } from "@/lib/design-profile";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() { return directions.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const direction = directions.find((item) => item.slug === slug);
  if (!direction) notFound();
  return pageMetadata({ title: `${direction.label} | Ship Onwards`, description: direction.brief, path: `/sites/ship-onwards/directions/${direction.slug}` });
}

export default async function DirectionPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ profile?: string | string[] }> }) {
  const { slug } = await params;
  const direction = directions.find((item) => item.slug === slug);
  if (!direction) notFound();
  const profile = profileFromQuery((await searchParams).profile, "ship-onwards");
  return <ShipSite profile={profile}><ShipDirectionDetail profile={profile} direction={direction} /></ShipSite>;
}
