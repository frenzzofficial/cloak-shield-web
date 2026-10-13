import type { Metadata } from "next";
import LegalPage from "@/components/layouts/LegalPage";
import { PRIVACY } from "@/packages/configs/legal.config";

export const metadata: Metadata = { title: "Privacy Policy" };

const Page = () => <LegalPage document={PRIVACY} />;

export default Page;
