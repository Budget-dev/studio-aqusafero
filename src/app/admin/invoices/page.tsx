
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf";
import { 
  FileText, 
  User, 
  MapPin, 
  Calendar as CalendarIcon, 
  CreditCard, 
  Download, 
  PlusCircle,
  Truck,
  ChevronLeft,
  Calculator,
  Printer
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InvoiceGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phone: "",
    invoiceNo: `AS-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    itemName: "Industrial RO Plant 250 LPH",
    quantity: 1,
    unitPrice: 85000,
    gstRate: 18,
    distanceKM: 0,
    deliveryChargePerKM: 15,
  });

  const [isGenerated, setIsGenerated] = useState(false);

  // Calculations
  const subtotal = formData.quantity * formData.unitPrice;
  const gstAmount = (subtotal * formData.gstRate) / 100;
  const deliveryTotal = formData.distanceKM * formData.deliveryChargePerKM;
  const grandTotal = subtotal + gstAmount + deliveryTotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [id]: id === 'quantity' || id === 'unitPrice' || id === 'gstRate' || id === 'distanceKM' || id === 'deliveryChargePerKM' 
        ? parseFloat(value) || 0 
        : value 
    }));
  };

  const drawInvoice = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Compact Professional Size: 700x1000
    const W = 700, H = 1000;
    canvas.width = W; canvas.height = H;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // 1. Header Section
    // Top Accent line (Thin blue)
    ctx.fillStyle = '#1a4fbf';
    ctx.fillRect(0, 0, W, 10);

    // Logo / Brand
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('AQUA SAFE RO WATER TECHNOLOGIES', 40, 55);
    
    ctx.fillStyle = '#1a4fbf';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('PURE WATER. SAFE FUTURE.', 40, 75);

    // Header Details (Right Side)
    ctx.textAlign = 'right';
    ctx.fillStyle = '#4b5563';
    ctx.font = 'normal 11px Arial';
    ctx.fillText('#07-13-23/2, NH-5 Main Road', W - 40, 50);
    ctx.fillText('Old Gajuwaka, Visakhapatnam, AP', W - 40, 65);
    ctx.fillText('Phone: +91 99858 50777', W - 40, 80);

    // Divider
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, 100); ctx.lineTo(W - 40, 100); ctx.stroke();

    // 2. Invoice Meta & Bill To
    const metaY = 140;
    
    // Left: INVOICE Label
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    ctx.font = '900 32px Arial';
    ctx.fillText('INVOICE', 40, metaY);

    // Center-Right: Bill To
    ctx.textAlign = 'left';
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.fillText('BILL TO', 340, metaY - 30);
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(formData.customerName.toUpperCase() || 'CLIENT NAME', 340, metaY - 10);
    ctx.font = 'normal 12px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(formData.address || 'Location/Village', 340, metaY + 10);
    ctx.fillText(formData.phone || 'Phone Number', 340, metaY + 25);

    // Right: Invoice Meta
    ctx.textAlign = 'right';
    ctx.fillStyle = '#4b5563';
    ctx.font = 'bold 11px Arial';
    ctx.fillText('INVOICE NO:', W - 140, metaY - 30);
    ctx.fillText('DATE:', W - 140, metaY - 15);
    ctx.fillText('DUE DATE:', W - 140, metaY);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 11px Arial';
    ctx.fillText(formData.invoiceNo, W - 40, metaY - 30);
    ctx.fillText(formData.date, W - 40, metaY - 15);
    ctx.fillText(formData.dueDate, W - 40, metaY);

    // 3. Table
    const tableY = 220;
    const col1 = 40, col2 = 80, col3 = 400, col4 = 520, col5 = W - 40;

    // Table Header
    ctx.fillStyle = '#f8fbff';
    ctx.fillRect(40, tableY, W - 80, 35);
    ctx.strokeStyle = '#e5e7eb';
    ctx.strokeRect(40, tableY, W - 80, 35);

    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('SL', col1 + 10, tableY + 22);
    ctx.fillText('ITEM DESCRIPTION', col2 + 10, tableY + 22);
    ctx.textAlign = 'center';
    ctx.fillText('QTY', col3 + 30, tableY + 22);
    ctx.textAlign = 'right';
    ctx.fillText('PRICE (₹)', col4 + 60, tableY + 22);
    ctx.fillText('TOTAL (₹)', col5 - 10, tableY + 22);

    // Data Row 1
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    ctx.font = 'normal 12px Arial';
    ctx.fillText('1', col1 + 15, tableY + 65);
    ctx.font = 'bold 12px Arial';
    ctx.fillText(formData.itemName, col2 + 10, tableY + 65);
    
    ctx.textAlign = 'center';
    ctx.font = 'normal 12px Arial';
    ctx.fillText(formData.quantity.toString(), col3 + 30, tableY + 65);
    
    ctx.textAlign = 'right';
    ctx.fillText(`₹${formData.unitPrice.toLocaleString()}`, col4 + 60, tableY + 65);
    ctx.font = 'bold 12px Arial';
    ctx.fillText(`₹${subtotal.toLocaleString()}`, col5 - 10, tableY + 65);

    // Row underline
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, tableY + 85); ctx.lineTo(W - 40, tableY + 85); ctx.stroke();

    // Logistics Row if KM > 0
    if (formData.distanceKM > 0) {
      ctx.textAlign = 'left';
      ctx.fillStyle = '#000000';
      ctx.font = 'normal 12px Arial';
      ctx.fillText('2', col1 + 15, tableY + 115);
      ctx.fillText(`Logistics & Delivery (${formData.distanceKM} KM)`, col2 + 10, tableY + 115);
      ctx.textAlign = 'center';
      ctx.fillText('1', col3 + 30, tableY + 115);
      ctx.textAlign = 'right';
      ctx.fillText(`₹${formData.deliveryChargePerKM}/KM`, col4 + 60, tableY + 115);
      ctx.font = 'bold 12px Arial';
      ctx.fillText(`₹${deliveryTotal.toLocaleString()}`, col5 - 10, tableY + 115);
      ctx.beginPath(); ctx.moveTo(40, tableY + 135); ctx.lineTo(W - 40, tableY + 135); ctx.stroke();
    }

    // 4. Summary Section
    const summaryY = H - 320;
    
    // Notes/Terms
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 11px Arial';
    ctx.fillText('TERMS & CONDITIONS', 40, summaryY);
    ctx.font = 'normal 10px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('1. All items are technical components with 1 year warranty.', 40, summaryY + 20);
    ctx.fillText('2. Goods once installed cannot be returned.', 40, summaryY + 35);
    ctx.fillText('3. Subject to Visakhapatnam Jurisdiction.', 40, summaryY + 50);

    // Totals Grid
    const labelX = W - 180;
    const valueX = W - 45;
    ctx.textAlign = 'right';

    ctx.fillStyle = '#4b5563';
    ctx.font = 'normal 12px Arial';
    ctx.fillText('Subtotal:', labelX, summaryY);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(`₹${subtotal.toLocaleString()}`, valueX, summaryY);

    ctx.fillStyle = '#4b5563';
    ctx.font = 'normal 12px Arial';
    ctx.fillText(`GST (${formData.gstRate}%):`, labelX, summaryY + 25);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(`₹${gstAmount.toLocaleString()}`, valueX, summaryY + 25);

    if (formData.distanceKM > 0) {
      ctx.fillStyle = '#4b5563';
      ctx.fillText('Delivery Charges:', labelX, summaryY + 50);
      ctx.fillStyle = '#000000';
      ctx.fillText(`₹${deliveryTotal.toLocaleString()}`, valueX, summaryY + 50);
    }

    // Grand Total Block
    const totalY = summaryY + 80;
    ctx.fillStyle = '#0a2d6e';
    ctx.fillRect(W - 240, totalY - 25, 200, 45);
    
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('TOTAL:', W - 150, totalY + 4);
    ctx.font = '900 18px Arial';
    ctx.fillText(`₹${grandTotal.toLocaleString()}`, W - 55, totalY + 4);

    // 5. Signature Section
    const sigY = H - 120;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('For AQUA SAFE RO WATER TECHNOLOGIES', W - 40, sigY);
    
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(W - 200, sigY + 50); ctx.lineTo(W - 40, sigY + 50); ctx.stroke();
    
    ctx.fillStyle = '#4b5563';
    ctx.font = 'normal 10px Arial';
    ctx.fillText('Authorized Signatory', W - 40, sigY + 65);

    // 6. Footer (Thin bar)
    ctx.fillStyle = '#1a4fbf';
    ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Thank you for choosing Aqua Safe - Pure Water. Safe Future.', W / 2, H - 15);
  };

  useEffect(() => {
    drawInvoice();
  }, [formData]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [700, 1000] });
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, 700, 1000);
    pdf.save(`AquaSafe_Invoice_${formData.invoiceNo}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-12">
          <div className="flex items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <Button asChild variant="ghost" className="p-2 rounded-xl hover:bg-white">
                    <Link href="/"><ChevronLeft className="h-6 w-6" /></Link>
                </Button>
                <div>
                    <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight uppercase">Invoice <span className="text-primary">Maker</span></h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Professional Technical Billing</p>
                </div>
             </div>
             <div className="flex gap-2">
                <Badge variant="outline" className="h-10 px-4 rounded-xl bg-white border-primary/20 text-primary font-black uppercase text-[10px]">ADMIN ONLY</Badge>
                <Button onClick={() => window.print()} variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white border-slate-200">
                  <Printer className="h-4 w-4" />
                </Button>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Panel */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-8">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="font-black font-headline uppercase text-sm">Document Configuration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Invoice No</Label>
                    <Input id="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Issue Date</Label>
                    <Input id="date" type="date" value={formData.date} onChange={handleInputChange} className="rounded-xl border-slate-200" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Customer Full Name</Label>
                  <Input id="customerName" value={formData.customerName} onChange={handleInputChange} placeholder="e.g. Ramesh Babu" className="h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Village / Billing Area</Label>
                  <Input id="address" value={formData.address} onChange={handleInputChange} placeholder="e.g. Plot 24, Gajuwaka" className="rounded-xl" />
                </div>

                <div className="pt-6 border-t space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Main Item Description</Label>
                    <Input id="itemName" value={formData.itemName} onChange={handleInputChange} className="h-12 rounded-xl" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Unit Price (₹)</Label>
                      <Input id="unitPrice" type="number" value={formData.unitPrice} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Qty</Label>
                      <Input id="quantity" type="number" value={formData.quantity} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Truck className="h-4 w-4" />
                    <span className="text-[10px] font-black uppercase">Tax & Logistics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">KM</Label>
                      <Input id="distanceKM" type="number" value={formData.distanceKM} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Rate/KM</Label>
                      <Input id="deliveryChargePerKM" type="number" value={formData.deliveryChargePerKM} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">GST %</Label>
                      <Input id="gstRate" type="number" value={formData.gstRate} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                  </div>
                </div>

                <Button onClick={() => setIsGenerated(true)} className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                  <Calculator className="mr-2 h-5 w-5" /> Calculate & Update
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black font-headline text-lg uppercase tracking-tight">Technical <span className="text-primary">Preview</span></h3>
                <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-slate-200 text-slate-700 font-black text-[9px] uppercase tracking-widest">700x1000 Compact</Badge>
                </div>
              </div>

              <div className="bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-auto rounded-xl shadow-inner border border-slate-100"
                />
              </div>

              <Button onClick={handleDownload} className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-lg shadow-xl transition-all">
                <Download className="mr-2 h-6 w-6" /> Export High-Res PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
