import type { Metadata } from "next";
import LegalPage from "@/components/layouts/LegalPage";
import { TERMS } from "@/packages/configs/legal.config";

export const metadata: Metadata = { title: "Terms of Service" };

const Page = () => <LegalPage document={TERMS} />;

export default Page;
