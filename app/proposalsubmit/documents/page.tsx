"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Moon, Sun, Edit3, CheckCircle2, BookCopy, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [theme, setTheme] = React.useState("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (!mounted) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 relative">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Proposal</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Pitch Info</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            {theme === "light" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-6 max-w-2xl">
          {/* Business Plan */}
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Edit3 /> Business Plan
          </h2>
          <Label>Upload a detailed business plan outlining your startup&apos;s vision and strategy.</Label>
          <Input
            placeholder="Upload your business plan (Word, PDF, or PowerPoint)"
            className="w-1/2"
            type="file"
          />

          <Separator className="my-6" />

          {/* Financials */}
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BookCopy /> Financials
          </h2>
          <Label>Upload financial statements or projections for your business.</Label>
          <Input
            placeholder="Upload financial documents (Excel or PDF)"
            className="w-1/2"
            type="file"
          />

          <Separator className="my-6" />

          {/* Pitch Deck */}
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Paperclip /> Pitch Deck
          </h2>
          <Label>Upload your pitch deck to present your startup to investors.</Label>
          <Input
            placeholder="Upload your pitch deck (PowerPoint or PDF)"
            className="w-1/2"
            type="file"
          />

          <Separator className="my-6" />

          {/* Additional Documents */}
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 /> Additional Documents
          </h2>
          <Label>Upload any additional supporting documents, if applicable.</Label>
          <Input
            placeholder="Upload additional documents (optional)"
            className="w-1/2"
            type="file"
          />

          <Separator className="my-6" />

          {/* Save and Continue Button */}
          <button
            onClick={() => router.push("/proposalsubmit/CompanyInfo")}
            className="shadow-[0_0_0_3px_#000000_inset] px-6 md:w-1/2 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
          >
            Save and Continue
          </button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
