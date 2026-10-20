import { redirect } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params
  redirect(`/estudio/${n}/bloques`)
}
