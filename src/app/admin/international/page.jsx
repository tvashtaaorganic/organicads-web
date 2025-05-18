"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label"

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// 🟢 Fetch data from your API
// const fetchPages = async (page = 0, searchQuery = "") => {
  const fetchPages = async (page = 0, searchQuery = "", descpost = "international") => {
  try {
    console.log("Fetching pages...");
    const url = new URL("/api/pages", window.location.origin); // Fix: Create an absolute URL
    url.searchParams.append("page", page);
    url.searchParams.append("search", searchQuery);
    url.searchParams.append("descpost", descpost); // 🔥 Add this line to filter by descpost

    const response = await fetch(url);
    if (!response.ok) {
      console.error("Error fetching data from API", response);
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    console.log("Fetched pages:", result);
    return result;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return { items: [], totalPages: 0 }; // Return an empty structure if there's an error
  }
};

export default function InternationalPages() {
 const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editingPage, setEditingPage] = useState(null); // Track the page being edited
  const [formData, setFormData] = useState({
    name: "",
    locationin: "",
    cityin: "",
    countryin: "",
    descpost: "",
    cat: "",
    titletag: "",
    descriptiontag: "",
    keywordstag: "",
    slug: "",
    servicename: "",
    date: "",
  });
  
  const pageSize = 10;
  const toast = useToast();

  // 🟢 Fetch data on mount and when searchQuery or pageIndex changes
 // useEffect(() => {
 //   const loadData = async () => {
  //    const result = await fetchPages(pageIndex, searchQuery, "domestic");
  //    if (result.items && result.items.length) {
  //      setData(result.items);  // Set fetched data
  //      setTotalPages(result.totalPages || 0);  // Set total pages (default to 0 if undefined)
  //    } else {
  //      setData([]);  // Fallback to an empty array if no data
   //     setTotalPages(0);  // Fallback to 0 pages if no data
  //    }
  //  };

  //  loadData();
 // }, [pageIndex, searchQuery]);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchPages(pageIndex, searchQuery, "international"); // 🔥 Pass "domestic"
      setData(result.items || []);
      setTotalPages(result.totalPages || 0);
    };
  
    loadData();
  }, [pageIndex, searchQuery]);




  // 🟢 Handle Edit
  const handleEdit = (page) => {
    setEditingPage(page);
    setFormData({
      name: page.name,
      locationin: page.locationin,
      cityin: page.cityin,
      countryin: page.countryin,
      descpost: page.descpost,
      cat: page.cat,
      titletag: page.titletag,
      descriptiontag: page.descriptiontag,
      keywordstag: page.keywordstag,
      slug: page.slug,
      servicename: page.servicename,
      date: page.date, // Keep date for reference, but it won't be editable
    });
  };

  // 🟢 Handle Update Form Submit
  const handleSubmitEdit = async () => {
    const updatedData = { 
      id: editingPage.id,  // Ensure the ID is included
      name: formData.name,
      locationin: formData.locationin,
      cityin: formData.cityin,
      countryin: formData.countryin,
      descpost: formData.descpost,
      cat: formData.cat,
      titletag: formData.titletag,
      descriptiontag: formData.descriptiontag,
      keywordstag: formData.keywordstag,
      slug: formData.slug,
      servicename: formData.servicename
    };
  
    console.log("Submitting updated data:", updatedData);  // Log to verify the structure
  
    try {
      const res = await fetch("/api/pages/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      const responseBody = await res.json();
      if (!res.ok) {
        throw new Error(responseBody.error || "Failed to update page");
      }
  
      alert(`Page updated successfully`);
      setEditingPage(null);  // Close the edit form
    } catch (error) {
      console.error("Error updating page:", error);
      alert(`Failed to update the page: ${error.message}`);
    }
  };
  


  // 🟢 Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const res = await fetch("/api/pages/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete page");
      }

      const responseData = await res.json();
      alert(`Page with ID ${id} was successfully deleted.`);
      setData((prev) => prev.filter((page) => page.id !== id)); // Remove deleted page from UI
    } catch (error) {
      console.error("Error deleting page:", error);
      alert(`Failed to delete the page. ${error.message}`);
    }
  };

  // 🟢 Table Columns
  const columns = [
    { accessorKey: "name", header: "Name" },
    { 
      accessorKey: "slug", 
      header: "Slug",
      cell: ({ row }) => (
        <a 
          href={`http://localhost:3000/services/${row.original.slug}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {row.original.slug}
        </a>
      )
    },
    { accessorKey: "locationin", header: "Location" },
    { accessorKey: "cityin", header: "City" },
    { accessorKey: "countryin", header: "Country" },
    { accessorKey: "date", header: "Date" },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => handleEdit(row.original)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => handleDelete(row.original.id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: data || [], // Make sure `data` is always an array
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col w-full p-4">
      <h1 className="text-xl font-bold mb-4">International Pages</h1>

      {/* Search Box */}
      <div className="flex justify-between mb-4">
        <Input
          placeholder="Search by name or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border flex flex-col w-full gap-2 mr-2 mb-4 max-w-max">
        <Table className="flex-col w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 max-w-max">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>

        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={pageIndex === i ? "default" : "outline"}
              size="sm"
              onClick={() => setPageIndex(i)}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={pageIndex === totalPages - 1}
        >
          Next
        </Button>
      </div>

      {/* Edit Modal */}
      {editingPage && (
        <div className="modal-overlay mt-6">
          <div className="modal-content flex flex-col">
            <h2 className="mb-5 text-md font-bold">Edit Page</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitEdit(formData);
              }}
            >
      <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="name" className="font-semibold">Name</Label>
      <Input 
      type="text"
      name="name"
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      placeholder="Name" 
      />
    </div>
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="locationin" className="font-semibold">Location In</Label>
      <Input 
      type="text"
      name="locationin"
      value={formData.locationin}
      onChange={(e) => setFormData({ ...formData, locationin: e.target.value })}
      placeholder="Location"
       />
    </div>
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="cityin" className="font-semibold">City In</Label>
      <Input 
      type="text"
      name="cityin"
      value={formData.cityin}
      onChange={(e) => setFormData({ ...formData, cityin: e.target.value })}
      placeholder="City"
       />
    </div>     
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="countryin" className="font-semibold">Country In</Label>
      <Input 
      type="text"
      name="countryin"
      value={formData.countryin}
      onChange={(e) => setFormData({ ...formData, countryin: e.target.value })}
      placeholder="Country"
       />
    </div>  
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="descpost" className="font-semibold">Description (catagory)</Label>
      <Input 
      type="text"
      name="descpost"
      value={formData.descpost}
      onChange={(e) => setFormData({ ...formData, descpost: e.target.value })}
      placeholder="Description"
       />
    </div>  
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="cat" className="font-semibold">Category</Label>
      <Input 
      type="text"
      name="cat"
      value={formData.cat}
      onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
      placeholder="Category"
       />
    </div>  
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="titletag" className="font-semibold">Title Tag</Label>
      <Input 
      type="text"
      name="titletag"
      value={formData.titletag}
      onChange={(e) => setFormData({ ...formData, titletag: e.target.value })}
      placeholder="Title Tag"
       />
    </div>     
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="descriptiontag" className="font-semibold">Description Tag</Label>
      <Input 
       type="text"
       name="descriptiontag"
       value={formData.descriptiontag}
       onChange={(e) => setFormData({ ...formData, descriptiontag: e.target.value })}
       placeholder="Description Tag"
       />
    </div>          
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="keywordstag" className="font-semibold">Keywords Tag</Label>
      <Input 
       type="text"
       name="keywordstag"
       value={formData.keywordstag}
       onChange={(e) => setFormData({ ...formData, keywordstag: e.target.value })}
       placeholder="Keywords Tag"
       />
    </div>          
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="slug" className="font-semibold">Slug (URL)</Label>
      <Input 
        type="text"
        name="slug"
        value={formData.slug}
        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        placeholder="Slug"
       />
    </div> 
    <div className="inline-flex flex-col w-full max-w-sm gap-2 mr-2 mb-4">
      <Label htmlFor="servicename" className="font-semibold">Service Name (Page)</Label>
      <Input 
        type="text"
        name="servicename"
        value={formData.servicename}
        onChange={(e) => setFormData({ ...formData, servicename: e.target.value })}
        placeholder="Service Name"
       />
    </div>                  
    <div className="flex-col w-full max-w-sm gap-2 mr-2 mb-4">
              {/* Date is not editable */}
              <Button type="submit" className="mr-4">Save Changes</Button>
              <Button onClick={() => setEditingPage(null)} variant="destructive">Cancel</Button>
    </div>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
}
