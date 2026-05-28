import { notFound } from "next/navigation";

// I redirect the not-found in this level i.e /dashboard level to itself 

export default function CatchAllPage() {
  notFound();
}