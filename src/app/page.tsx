import { redirect } from "next/navigation";

// The root URL redirects to the marketing homepage
export default function RootPage() {
  redirect("/marketing");
}
