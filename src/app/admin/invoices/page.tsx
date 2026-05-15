
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
  Hash,
  Barcode as BarcodeIcon,
  Calculator,
  ChevronLeft
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

    // Standard A4 Ratio at 96DPI is roughly 794x1123. Using 800x1100 for clean math.
    const W = 800, H = 1100;
    canvas.width = W; canvas.height = H;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // 1. Header Section (Blue Bar)
    const headerHeight = 160;
    ctx.fillStyle = '#1a4fbf';
    ctx.fillRect(0, 0, W, headerHeight);

    // Title: INVOICE
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('INVOICE', 40, headerHeight - 60);

    // Company Details (Right Side)
    ctx.textAlign = 'right';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('AQUA SAFE RO WATER TECHNOLOGIES', W - 40, 45);
    ctx.font = 'normal 13px Arial';
    ctx.fillStyle = '#dbeafe';
    ctx.fillText('#07-13-23/2, NH-5 Main Road', W - 40, 65);
    ctx.fillText('Old Gajuwaka, Visakhapatnam, AP', W - 40, 80);
    ctx.fillText('Phone: +91 99858 50777', W - 40, 95);
    ctx.fillText('Email: billing@aquasafero.com', W - 40, 110);

    // 2. Info Grid
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    
    // Left: Invoice Meta
    const infoY = headerHeight + 60;
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Invoice No.', 40, infoY);
    ctx.fillText('Date of Issue', 40, infoY + 25);
    ctx.fillText('Due Date', 40, infoY + 50);

    ctx.font = 'normal 14px Arial';
    ctx.fillText(formData.invoiceNo, 150, infoY);
    ctx.fillText(formData.date, 150, infoY + 25);
    ctx.fillText(formData.dueDate, 150, infoY + 50);

    // Right: Bill To
    ctx.textAlign = 'right';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Bill To', W - 40, infoY - 15);
    ctx.font = 'bold 16px Arial';
    ctx.fillText(formData.customerName.toUpperCase() || 'CLIENT NAME', W - 40, infoY + 10);
    ctx.font = 'normal 13px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(formData.address || 'Address Line 1', W - 40, infoY + 30);
    ctx.fillText(formData.phone || 'Phone Number', W - 40, infoY + 45);

    // 3. Table
    const tableY = infoY + 110;
    const col1 = 40, col2 = 80, col3 = 450, col4 = 580, col5 = W - 40;

    // Header row
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(40, tableY); ctx.lineTo(W - 40, tableY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, tableY + 35); ctx.lineTo(W - 40, tableY + 35); ctx.stroke();

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Item', col1 + 10, tableY + 22);
    ctx.fillText('Description', col2 + 20, tableY + 22);
    ctx.textAlign = 'center';
    ctx.fillText('Qty', col3 + 30, tableY + 22);
    ctx.textAlign = 'right';
    ctx.fillText('Rate', col4 + 60, tableY + 22);
    ctx.fillText('Amount', col5 - 10, tableY + 22);

    // Data row 1 (zebra striping)
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(40, tableY + 36, W - 80, 40);
    ctx.fillStyle = '#000000';
    ctx.font = 'normal 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('1', col1 + 15, tableY + 62);
    ctx.fillText(formData.itemName, col2 + 20, tableY + 62);
    ctx.textAlign = 'center';
    ctx.fillText(formData.quantity.toString(), col3 + 30, tableY + 62);
    ctx.textAlign = 'right';
    ctx.fillText(`₹${formData.unitPrice.toLocaleString()}`, col4 + 60, tableY + 62);
    ctx.font = 'bold 13px Arial';
    ctx.fillText(`₹${subtotal.toLocaleString()}`, col5 - 10, tableY + 62);

    // Logistics row if applicable
    if (formData.distanceKM > 0) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(40, tableY + 76, W - 80, 40);
        ctx.fillStyle = '#4b5563';
        ctx.font = 'normal 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('2', col1 + 15, tableY + 102);
        ctx.fillText(`Logistics & Delivery (${formData.distanceKM} KM)`, col2 + 20, tableY + 102);
        ctx.textAlign = 'center';
        ctx.fillText('1', col3 + 30, tableY + 102);
        ctx.textAlign = 'right';
        ctx.fillText(`₹${formData.deliveryChargePerKM}/KM`, col4 + 60, tableY + 102);
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = '#000000';
        ctx.fillText(`₹${deliveryTotal.toLocaleString()}`, col5 - 10, tableY + 102);
    }

    // Fill blank rows for visual template matching
    for(let i=0; i<6; i++) {
        const rowY = tableY + 76 + (formData.distanceKM > 0 ? 40 : 0) + (i * 40);
        if (rowY > H - 350) break;
        ctx.strokeStyle = '#f3f4f6';
        ctx.beginPath(); ctx.moveTo(40, rowY + 39); ctx.lineTo(W - 40, rowY + 39); ctx.stroke();
    }

    // 4. Summary Section
    const summaryY = H - 280;
    ctx.textAlign = 'right';
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#000000';
    
    const labelX = W - 180;
    const valueX = W - 45;

    ctx.fillText('Subtotal', labelX, summaryY);
    ctx.font = 'normal 14px Arial';
    ctx.fillText(`₹${subtotal.toLocaleString()}`, valueX, summaryY);

    ctx.font = 'bold 14px Arial';
    ctx.fillText('Tax Rate', labelX, summaryY + 25);
    ctx.font = 'normal 14px Arial';
    ctx.fillText(`${formData.gstRate}%`, valueX, summaryY + 25);

    ctx.font = 'bold 14px Arial';
    ctx.fillText('GST', labelX, summaryY + 50);
    ctx.font = 'normal 14px Arial';
    ctx.fillText(`₹${gstAmount.toLocaleString()}`, valueX, summaryY + 50);

    if (formData.distanceKM > 0) {
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Logistics', labelX, summaryY + 75);
        ctx.font = 'normal 14px Arial';
        ctx.fillText(`₹${deliveryTotal.toLocaleString()}`, valueX, summaryY + 75);
    }

    // Grand Total
    const totalBoxY = summaryY + 100;
    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(W - 260, totalBoxY - 20, 220, 45);
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Total', labelX, totalBoxY + 10);
    ctx.font = '900 20px Arial';
    ctx.fillStyle = '#1a4fbf';
    ctx.fillText(`₹${grandTotal.toLocaleString()}`, valueX, totalBoxY + 10);

    // Terms & Conditions
    ctx.textAlign = 'left';
    ctx.fillStyle = '#6b7280';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Terms', 40, summaryY);
    ctx.font = 'normal 10px Arial';
    ctx.fillText('1. Goods once sold will not be taken back.', 40, summaryY + 20);
    ctx.fillText('2. All disputes subject to Visakhapatnam Jurisdiction.', 40, summaryY + 35);
    ctx.fillText('3. 1 Year warranty on mechanical components.', 40, summaryY + 50);

    // Signature Area
    ctx.textAlign = 'right';
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText('For AQUA SAFE RO WATER TECHNOLOGIES', W - 40, H - 120);
    ctx.font = 'normal 11px Arial';
    ctx.fillText('Authorized Signatory', W - 40, H - 70);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 0.5;
    ctx.beginPath(); ctx.moveTo(W - 200, H - 85); ctx.lineTo(W - 40, H - 85); ctx.stroke();

    // 5. Footer (Blue Bar)
    ctx.fillStyle = '#1a4fbf';
    ctx.fillRect(0, H - 40, W, 40);
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Thank you for your business!', W / 2, H - 15);
  };

  useEffect(() => {
    drawInvoice();
  }, [formData]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // A4 Landscape is [842, 595], Portrait is [595, 842]. Scaling canvas properly.
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [800, 1100] });
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, 800, 1100);
    pdf.save(`Invoice_${formData.invoiceNo}_${formData.customerName.replace(/\s+/g, '_')}.pdf`);
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
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Professional Billing Portal</p>
                </div>
             </div>
             <Badge variant="outline" className="h-10 px-4 rounded-xl bg-white border-primary/20 text-primary font-black uppercase tracking-widest text-[10px]">Administrative Access Only</Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Panel */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-8">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="font-black font-headline uppercase text-sm">Invoice Configuration</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Invoice No</Label>
                    <Input id="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Issue Date</Label>
                    <Input id="date" type="date" value={formData.date} onChange={handleInputChange} className="rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Customer Name</Label>
                  <Input id="customerName" value={formData.customerName} onChange={handleInputChange} placeholder="e.g. Ramesh Babu" className="h-12 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400">Billing Address / Village</Label>
                  <Input id="address" value={formData.address} onChange={handleInputChange} placeholder="e.g. Plot 24, Gajuwaka" className="rounded-xl" />
                </div>

                <div className="pt-6 border-t space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Item Description</Label>
                    <Input id="itemName" value={formData.itemName} onChange={handleInputChange} className="h-12 rounded-xl" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Unit Price (₹)</Label>
                      <Input id="unitPrice" type="number" value={formData.unitPrice} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Quantity</Label>
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
                  <Calculator className="mr-2 h-5 w-5" /> Refresh Preview
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black font-headline text-lg uppercase">Live <span className="text-primary">Invoice Preview</span></h3>
                <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-slate-200 text-slate-700">A4 Portrait</Badge>
                    <Badge variant="outline" className="border-green-200 text-green-600 bg-green-50">High DPI Ready</Badge>
                </div>
              </div>

              <div className="bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-auto rounded-xl shadow-inner border border-slate-100"
                />
              </div>

              <Button onClick={handleDownload} className="w-full h-16 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-lg shadow-xl shadow-green-600/20">
                <Download className="mr-2 h-6 w-6" /> Export Professional PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
