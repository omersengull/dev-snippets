"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
export default function SortSelectButtons({
  initialValue,
}: {
  initialValue: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const params=new URLSearchParams(window.location.search);
    params.set('sort',e.target.value);
    router.push(`${pathname}?${params.toString()}`,{scroll:false});
  };
  return (
    <select
      onChange={handleChange}
      defaultValue={initialValue}
      className="bg-transparent border-none p-0 text-white font-bold focus:ring-0 cursor-pointer outline-none"
    >
      <option className="bg-card">Newest</option>
      <option className="bg-card">Top Rated</option>
    </select>
  );
}
