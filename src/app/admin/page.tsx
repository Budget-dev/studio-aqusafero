
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Settings, Edit, Trash2, Plus, Search, Filter } from "lucide-react";

const initialServices = [
  { id: 1, name: "Industrial RO Plant Type-A", category: "Industrial", status: "Active", price: "$12,500+" },
  { id: 2, name: "Modular Desalinization Unit", category: "Industrial", status: "Draft", price: "$45,000+" },
  { id: 3, name: "ClinicPurity Pro", category: "Commercial", status: "Active", price: "$3,200" },
  { id: 4, name: "HomeGuard X7", category: "Residential", status: "Active", price: "$599" },
];

export default function AdminPage() {
  const [services] = useState(initialServices);

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Sidebar Sidebar Simulation */}
      <aside className="w-64 bg-accent text-accent-foreground p-6 space-y-8 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary"></div>
          <span className="font-headline font-bold text-lg">Admin Hub</span>
        </div>
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-primary-foreground bg-primary/10">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-white/5">
            <Settings className="mr-2 h-4 w-4" /> Services
          </Button>
          <Button variant="ghost" className="w-full justify-start hover:bg-white/5">
            <Filter className="mr-2 h-4 w-4" /> Inquiries
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold font-headline text-accent">Service Management</h1>
            <p className="text-muted-foreground">Manage your public-facing service catalog and pricing.</p>
          </div>
          <Button className="bg-primary">
            <Plus className="mr-2 h-4 w-4" /> Add New Service
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Quotes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">48</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="font-headline">Service Catalog</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="Filter services..." />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium text-accent">{service.name}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>
                      <Badge variant={service.status === 'Active' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
