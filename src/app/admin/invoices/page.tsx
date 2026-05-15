
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
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function InvoiceGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    village: "",
    phone: "",
    invoiceNo: `AS-INV-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
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

    const W = 800, H = 1000;
    canvas.width = W; canvas.height = H;

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Accent Header
    ctx.fillStyle = '#0a2d6e';
    ctx.fillRect(0, 0, W, 140);

    // Logo & Header Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('AQUA SAFE RO WATER TECHNOLOGIES', 40, 60);
    ctx.font = '14px Arial';
    ctx.fillText('Pure Water. Safe Future. | Visakhapatnam, AP, India', 40, 85);
    ctx.fillText('Phone: +91 99858 50777 | Email: billing@aquasafero.com', 40, 105);

    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('INVOICE', W - 40, 75);
    ctx.font = 'bold 16px Arial';
    ctx.fillText(formData.invoiceNo, W - 40, 105);
    ctx.textAlign = 'left';

    // Info Sections
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('BILL TO:', 40, 190);
    ctx.font = 'bold 18px Arial';
    ctx.fillText(formData.customerName.toUpperCase() || 'VALUED CUSTOMER', 40, 215);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(`Location: ${formData.village || 'N/A'}`, 40, 235);
    ctx.fillText(`Phone: ${formData.phone || 'N/A'}`, 40, 255);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('INVOICE DATE:', W - 40, 190);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.fillText(formData.date, W - 40, 215);
    ctx.textAlign = 'left';

    // Table Header
    const tableY = 320;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(40, tableY, W - 80, 40);
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('DESCRIPTION', 55, tableY + 25);
    ctx.textAlign = 'center';
    ctx.fillText('QTY', 450, tableY + 25);
    ctx.fillText('UNIT PRICE', 550, tableY + 25);
    ctx.textAlign = 'right';
    ctx.fillText('TOTAL', W - 55, tableY + 25);

    // Table Row
    ctx.fillStyle = '#000000';
    ctx.font = '14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(formData.itemName, 55, tableY + 75);
    ctx.textAlign = 'center';
    ctx.fillText(formData.quantity.toString(), 450, tableY + 75);
    ctx.fillText(`₹${formData.unitPrice.toLocaleString()}`, 550, tableY + 75);
    ctx.textAlign = 'right';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`₹${subtotal.toLocaleString()}`, W - 55, tableY + 75);

    // Distance Row
    if (formData.distanceKM > 0) {
      ctx.textAlign = 'left';
      ctx.font = '12px Arial';
      ctx.fillStyle = '#6b7280';
      ctx.fillText(`Logistics / Delivery (${formData.distanceKM} KM @ ₹${formData.deliveryChargePerKM}/KM)`, 55, tableY + 110);
      ctx.textAlign = 'right';
      ctx.fillText(`₹${deliveryTotal.toLocaleString()}`, W - 55, tableY + 110);
    }

    // Divider
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, tableY + 140);
    ctx.lineTo(W - 40, tableY + 140);
    ctx.stroke();

    // Summary
    const summaryY = tableY + 180;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#4b5563';
    ctx.font = '14px Arial';
    ctx.fillText('Subtotal:', W - 180, summaryY);
    ctx.fillText(`GST (${formData.gstRate}%):`, W - 180, summaryY + 30);
    if (formData.distanceKM > 0) ctx.fillText('Delivery Charges:', W - 180, summaryY + 60);
    
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`₹${subtotal.toLocaleString()}`, W - 55, summaryY);
    ctx.fillText(`₹${gstAmount.toLocaleString()}`, W - 55, summaryY + 30);
    if (formData.distanceKM > 0) ctx.fillText(`₹${deliveryTotal.toLocaleString()}`, W - 55, summaryY + 60);

    // Grand Total Box
    const totalBoxY = summaryY + 90;
    ctx.fillStyle = '#0a2d6e';
    ctx.fillRect(W - 350, totalBoxY, 310, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('GRAND TOTAL:', W - 180, totalBoxY + 37);
    ctx.font = 'bold 22px Arial';
    ctx.fillText(`₹${grandTotal.toLocaleString()}`, W - 55, totalBoxY + 37);

    // Barcode Simulation
    ctx.textAlign = 'left';
    ctx.fillStyle = '#000000';
    const barX = 40, barY = H - 150;
    for(let i=0; i<40; i++) {
        const h = 40;
        const w = Math.random() * 4 + 1;
        ctx.fillRect(barX + (i*6), barY, w, h);
    }
    ctx.font = '10px Courier';
    ctx.fillText(`* ${formData.invoiceNo} *`, barX, barY + 55);

    // Seal and Signature
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('For AQUA SAFE RO WATER TECHNOLOGIES', W - 40, H - 100);
    ctx.font = 'italic 12px Arial';
    ctx.fillText('Authorized Signatory', W - 40, H - 40);
    ctx.strokeStyle = '#0a2d6e';
    ctx.beginPath(); ctx.moveTo(W - 220, H - 55); ctx.lineTo(W - 40, H - 55); ctx.stroke();

    // Footer Watermark
    ctx.textAlign = 'center';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px Arial';
    ctx.fillText('This is a computer generated document. No physical signature required.', W/2, H - 20);
  };

  useEffect(() => {
    drawInvoice();
  }, [formData]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [800, 1000] });
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, 800, 1000);
    pdf.save(`Invoice_${formData.invoiceNo}_${formData.customerName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight uppercase">Invoice <span className="text-primary">Maker</span></h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Administrative Billing Portal</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Panel */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white overflow-hidden">
              <CardHeader className="bg-slate-900 text-white p-8">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <CardTitle className="font-black font-headline uppercase text-sm">Customer & Order Info</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Invoice No</Label>
                      <Input id="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Date</Label>
                      <Input id="date" type="date" value={formData.date} onChange={handleInputChange} className="rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400">Customer Name</Label>
                    <Input id="customerName" value={formData.customerName} onChange={handleInputChange} placeholder="e.g. Ramesh Babu" className="h-12 rounded-xl" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Village / Location</Label>
                      <Input id="village" value={formData.village} onChange={handleInputChange} placeholder="e.g. Gajuwaka" className="rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Phone</Label>
                      <Input id="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91..." className="rounded-xl" />
                    </div>
                  </div>
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
                    <span className="text-[10px] font-black uppercase">Logistics & Tax</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-400">Distance (KM)</Label>
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

                <Button onClick={() => setIsGenerated(true)} className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-xl">
                  <Calculator className="mr-2 h-5 w-5" /> Update Document
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black font-headline text-lg uppercase">Live <span className="text-primary">Invoice Preview</span></h3>
                <Badge variant="outline" className="bg-white border-primary/20 text-primary">A4 Format Portrait</Badge>
              </div>

              <div className="bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-auto rounded-xl shadow-inner border border-slate-100"
                />
              </div>

              <Button onClick={handleDownload} className="w-full h-16 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-lg shadow-xl shadow-green-600/20">
                <Download className="mr-2 h-6 w-6" /> Download Professional PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

