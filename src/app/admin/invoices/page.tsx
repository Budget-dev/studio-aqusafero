
'use client';

import { useCollection, useFirestore } from '@/firebase';
import { collection, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Printer, 
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';

export default function AdminInvoicesPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const { data: invoices, loading } = useCollection(
    firestore ? query(collection(firestore, 'invoices'), orderBy('createdAt', 'desc')) : null
  );

  const filtered = invoices?.filter(inv => 
    inv.customerName.toLowerCase().includes(search.toLowerCase()) || 
    inv.invoiceNo.toLowerCase().includes(search.toLowerCase())
  );

  const generatePDF = (invoice: any) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text('AQUA SAFE RO WORKS', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Professional Technical Invoicing', 105, 28, { align: 'center' });
    
    doc.setFontSize(14);
    doc.text(`INVOICE: ${invoice.invoiceNo}`, 20, 50);
    doc.text(`DATE: ${invoice.date}`, 20, 60);
    doc.text(`CUSTOMER: ${invoice.customerName}`, 20, 70);

    doc.line(20, 80, 190, 80);
    doc.text('DESCRIPTION', 25, 90);
    doc.text('TOTAL (INR)', 160, 90);
    doc.line(20, 95, 190, 95);

    doc.text('Water Treatment System / Spares', 25, 105);
    doc.text(`INR ${invoice.total.toLocaleString()}`, 160, 105);

    doc.save(`AquaSafe_Invoice_${invoice.invoiceNo}.pdf`);
    toast({ title: 'PDF Exported', description: 'Document saved to your downloads.' });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tight">Invoice <span className="text-primary">Ledger</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Managing technical sales and billing records</p>
        </div>
        <Button asChild className="h-14 rounded-2xl bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] shadow-xl">
          <Link href="/admin/invoices/new"><Plus className="mr-2 h-4 w-4" /> Create Invoice</Link>
        </Button>
      </header>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by ID or client name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-bold"
            />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none h-14">
              <TableHead className="font-black text-[9px] uppercase tracking-widest pl-8">Invoice Info</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest">Client Name</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest text-center">Amount</TableHead>
              <TableHead className="font-black text-[9px] uppercase tracking-widest text-center">Status</TableHead>
              <TableHead className="text-right pr-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Hub Sync in Progress...</TableCell></TableRow>
            ) : filtered?.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="h-32 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">No records found</TableCell></TableRow>
            ) : filtered?.map((inv) => (
              <TableRow key={inv.id} className="hover:bg-slate-50 transition-colors group h-20">
                <TableCell className="pl-8">
                  <div>
                    <p className="font-black text-slate-900 uppercase text-sm">{inv.invoiceNo}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{inv.date}</p>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-slate-600 uppercase text-xs">
                  {inv.customerName}
                </TableCell>
                <TableCell className="text-center font-black text-slate-900">
                  ₹{inv.total.toLocaleString()}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={cn(
                    "font-black uppercase text-[8px] tracking-widest border-none px-2",
                    inv.status === 'Paid' ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex justify-end gap-2">
                    <Button 
                      onClick={() => generatePDF(inv)}
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-xl hover:bg-white text-primary"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white text-slate-400">
                      <Printer className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
