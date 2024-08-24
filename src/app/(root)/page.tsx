import Logo from "@/components/Logo";
import Link from "next/link";
import {ArrowRightIcon} from "lucide-react"

export default function Home() {
  return (
    <>
      <Logo version="completed" image_size={{ height: 20, width: 20}} text_size_in_rem={2} />
      <h1>StockWise</h1>
      <Link href='/dashboard' className="flex gap-2">
        Dashboard 
        <ArrowRightIcon />
      </Link>
    </>
  );
}
