// app/page.tsx
// Fallback redirect to default locale (works even if middleware is bypassed)
import { redirect } from "next/navigation";

export default function RootRedirect() {
  redirect("/en");
}
