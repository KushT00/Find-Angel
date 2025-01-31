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
import { Moon, Sun, UserPlus, Users, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [teamSize, setTeamSize] = useState(""); // Total team size
  const [coreTeam, setCoreTeam] = useState([
    { name: "", role: "", bio: "", contact: "" },
  ]);

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

  const addCoreMember = () => {
    setCoreTeam([...coreTeam, { name: "", role: "", bio: "", contact: "" }]);
  };

  const updateCoreMember = (index: number, field: string, value: string) => {
    const updatedTeam = [...coreTeam];
    updatedTeam[index][field] = value;
    setCoreTeam(updatedTeam);
  };

  const deleteCoreMember = (index: number) => {
    const updatedTeam = coreTeam.filter((_, i) => i !== index);
    setCoreTeam(updatedTeam);
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
                  <BreadcrumbPage>Team Info</BreadcrumbPage>
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
          {/* Total Team Size */}
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Users /> Team Information
          </h2>
          <Label>Total Team Size</Label>
          <Input
            placeholder="Enter the total number of team members"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            type="number"
          />

          <Separator className="my-6" />

          {/* Core Team Members */}
          <h2 className="text-lg font-semibold">Core Team Members</h2>
          {coreTeam.map((member, index) => (
            <div key={index} className="flex flex-col gap-4 p-4 border rounded-md relative">
              <Label>Member {index + 1}</Label>
              <Input
                placeholder="Full Name"
                value={member.name}
                onChange={(e) => updateCoreMember(index, "name", e.target.value)}
              />
              <Input
                placeholder="Role (e.g., CEO, CTO)"
                value={member.role}
                onChange={(e) => updateCoreMember(index, "role", e.target.value)}
              />
              <Input
                placeholder="Short Bio/Description"
                value={member.bio}
                onChange={(e) => updateCoreMember(index, "bio", e.target.value)}
              />
              <Input
                placeholder="Contact Info (Email/Phone)"
                value={member.contact}
                onChange={(e) => updateCoreMember(index, "contact", e.target.value)}
              />
              <Button
                onClick={() => deleteCoreMember(index)}
                className="w-1/5  flex items-center  bg-red-600 text-white hover:bg-red-700"
              >
                <Trash  /> 
              </Button>
            </div>
          ))}

          <Button onClick={addCoreMember} className="flex items-center gap-2 mt-4">
            <UserPlus /> Add Core Member
          </Button>

          <Separator className="my-6" />

          {/* Save and Continue */}
          <button
            onClick={() => router.push("/proposalsubmit/NextStep")}
            className="shadow-[0_0_0_3px_#000000_inset] px-6 md:w-1/2 py-2 bg-transparent border border-black dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
          >
            Save and Continue
          </button>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
