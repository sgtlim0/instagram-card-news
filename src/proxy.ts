export { auth as proxy } from "@/auth"

export const config = {
  matcher: ["/create/:path*", "/editor/:path*"],
}
