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
import { Moon, Sun, Building2, Contact, LucideDollarSign, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Puducherry", "Chandigarh"
  ];

  const industries = [
    "Technology", "Fintech", "Healthcare", "E-commerce", "AI & Machine Learning",
    "Education", "Blockchain", "SaaS", "Renewable Energy", "Food & Beverages",
    "Biotech", "Agriculture", "Real Estate", "Gaming", "Media & Entertainment"
  ];

  const fundingStages = [
    "Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Growth Stage", "IPO"
  ];

  const investorRoles = [
    "Active Monthly Involvement (Mentorship + Strategy)",
    "Weekly Consultancy (Guidance & Networking)",
    "Just Funding (No Involvement)",
    "Board Member (Quarterly Meetings & Oversight)",
    "Hands-on Partner (Actively helps in operations & hiring)"
  ];

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
                  <BreadcrumbPage>Company Info</BreadcrumbPage>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full mx-auto">
          {/* Left Column - Personal & Company Details */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Contact /> Personal Details</h2>
            <Label>Full Name</Label>
            <Input placeholder="Enter Full Name" />
            <Label>Email Address</Label>
            <Input placeholder="Enter Email Address" type="email" />
            <Label>Mobile Number</Label>
            <Input placeholder="Enter Mobile Number" type="tel" />
            <Separator className="my-6" />

            <h2 className="text-xl font-semibold flex items-center gap-2"><Building2 /> Company Details</h2>
            <Label>Pitch Title</Label>
            <Input placeholder="Enter Pitch Title" />
            <Label>Website (Optional)</Label>
            <Input placeholder="Enter Website" />
            <Label>Where is your company based?</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {indianStates.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right Column - Funding Details */}
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><IndianRupee /> Funding Details</h2>
            
            <Label>Industry 1</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Label>Stage</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                {fundingStages.map((stage) => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Ideal Investor Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Investor Role" />
              </SelectTrigger>
              <SelectContent>
                {investorRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Label>Previous Round Raised (Rs.)</Label>
            <Input placeholder="Enter Amount" type="number" />
            <Label>Total Amount Raising (Rs.)</Label>
            <Input placeholder="Enter Amount" type="number" />
            <Label>Amount Raised So Far (Rs.)</Label>
            <Input placeholder="Enter Amount" type="number" />
            <div className="flex justify-center md:justify-end  py-5">
        <button
           onClick={() => router.push("/proposalsubmit/pitchandDeal")} 
          className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
           Save and Continue
          </button>
        </div>
          </div>
          
        </div>

        
      </SidebarInset>
    </SidebarProvider>
  );
}
