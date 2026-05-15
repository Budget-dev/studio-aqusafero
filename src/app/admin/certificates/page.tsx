
"use client"

import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from "jspdf";
import { 
  GraduationCap, 
  User, 
  FileText, 
  Calendar as CalendarIcon, 
  Award, 
  Download, 
  PlusCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const COURSES = [
  "RO Technician Certification Course",
  "Industrial RO Plant Operation & Maintenance",
  "Residential RO Purifier Servicing",
  "Water Quality Analysis & Treatment",
  "Advanced RO Membrane Technology",
  "Complete RO Installation & Commissioning"
];

export default function CertificateGeneratorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    studentName: "",
    fatherName: "",
    certNo: "",
    issueDate: new Date().toISOString().split('T')[0],
    courseName: "",
    duration: "30 Days",
    grade: "A (Excellent)",
    directorName: "Dr. V. Ramakrishna",
    studentAddr: ""
  });

  const [isGenerated, setIsGenerated] = useState(false);

  const pad = (n: number) => String(n).padStart(2, '0');

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '__ / __ / ____';
    const d = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${pad(d.getDate())} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const drawCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 900, H = 650;
    const { studentName, fatherName, certNo, issueDate, courseName, duration, grade, directorName } = formData;

    const name = studentName || 'Student Name';
    const dateStr = formatDate(issueDate);
    const course = courseName || 'RO Technician Certification Course';
    const director = directorName || 'Director';

    // Background
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#eaf3ff');
    bgGrad.addColorStop(0.5, '#f8fbff');
    bgGrad.addColorStop(1, '#dbeafe');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Outer border
    ctx.strokeStyle = '#1a4fbf';
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, W - 32, H - 32);

    // Inner border
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, W - 56, H - 56);

    // Corner decorations
    const corner = (x: number, y: number, rx: number, ry: number) => {
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y + ry); ctx.lineTo(x, y); ctx.lineTo(x + rx, y);
      ctx.stroke();
    };
    corner(28, 28, 40, 40); corner(W - 68, 28, 40, 40);
    corner(28, H - 68, 40, -40); corner(W - 68, H - 68, 40, -40);

    // Top accent bar
    const topBar = ctx.createLinearGradient(0, 0, W, 0);
    topBar.addColorStop(0, '#0a2d6e');
    topBar.addColorStop(0.5, '#2563eb');
    topBar.addColorStop(1, '#0a2d6e');
    ctx.fillStyle = topBar;
    ctx.fillRect(36, 36, W - 72, 10);

    // Bottom accent bar
    ctx.fillStyle = topBar;
    ctx.fillRect(36, H - 46, W - 72, 10);

    // Logo circle
    ctx.beginPath();
    ctx.arc(W / 2, 88, 38, 0, Math.PI * 2);
    const logoGrad = ctx.createRadialGradient(W / 2, 88, 0, W / 2, 88, 38);
    logoGrad.addColorStop(0, '#2563eb');
    logoGrad.addColorStop(1, '#0a2d6e');
    ctx.fillStyle = logoGrad;
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('💧', W / 2, 100);

    // Header - Company name
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 26px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('AQUA SAFE RO WATER TECHNOLOGIES', W / 2, 148);

    ctx.fillStyle = '#2563eb';
    ctx.font = '13px Arial';
    ctx.fillText('Pure Water. Safe Future. | Visakhapatnam, India', W / 2, 167);

    // Divider line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(80, 178); ctx.lineTo(W - 80, 178);
    ctx.stroke();

    // Certificate title
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 38px Georgia';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', W / 2, 222);

    // Subtitle
    ctx.fillStyle = '#4b5563';
    ctx.font = 'italic 15px Georgia';
    ctx.fillText('This is to certify that', W / 2, 256);

    // Student Name
    const nameGrad = ctx.createLinearGradient(0, 0, W, 0);
    nameGrad.addColorStop(0, '#1a4fbf');
    nameGrad.addColorStop(1, '#2563eb');
    ctx.fillStyle = nameGrad;
    ctx.font = 'bold 42px Georgia';
    ctx.fillText(name.toUpperCase(), W / 2, 308);

    // Underline for name
    const nm = ctx.measureText(name.toUpperCase());
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - nm.width / 2, 316);
    ctx.lineTo(W / 2 + nm.width / 2, 316);
    ctx.stroke();

    if (fatherName) {
      ctx.fillStyle = '#6b7280';
      ctx.font = 'italic 13px Arial';
      ctx.fillText(`S/o or D/o: ${fatherName}`, W / 2, 337);
    }

    // Course text
    ctx.fillStyle = '#374151';
    ctx.font = '15px Arial';
    ctx.fillText('has successfully completed the training program in', W / 2, fatherName ? 362 : 345);

    // Course name
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 20px Georgia';
    ctx.fillText(`"${course}"`, W / 2, fatherName ? 392 : 375);

    // Details row
    const detY = fatherName ? 428 : 414;
    ctx.fillStyle = '#4b5563';
    ctx.font = '13px Arial';
    ctx.fillText(`Duration: ${duration}   |   Grade: ${grade}   |   Date: ${dateStr}`, W / 2, detY);

    // Certificate number
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.fillText(`Certificate No: ${certNo || 'ASRO/----/---'}`, W / 2, detY + 22);

    // Signature section
    const sigY = H - 112;

    // Left signature - Director
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(director, 90, sigY);
    ctx.strokeStyle = '#0a2d6e';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(80, sigY - 30); ctx.lineTo(280, sigY - 30); ctx.stroke();
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Arial';
    ctx.fillText('Authorized Signatory', 90, sigY + 16);
    ctx.fillText('Aqua Safe RO Water Technologies', 90, sigY + 31);

    // Right seal area
    ctx.textAlign = 'right';
    ctx.beginPath(); ctx.moveTo(W - 280, sigY - 30); ctx.lineTo(W - 80, sigY - 30); ctx.stroke();
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 13px Arial';
    ctx.fillText('Official Seal', W - 90, sigY);
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px Arial';
    ctx.fillText('Aqua Safe RO Water Technologies', W - 90, sigY + 16);

    // Decorative seal circle (right)
    ctx.textAlign = 'center';
    ctx.beginPath();
    ctx.arc(W - 130, sigY - 60, 32, 0, Math.PI * 2);
    ctx.strokeStyle = '#2563eb'; ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = 'rgba(37,99,235,0.08)';
    ctx.fill();
    ctx.fillStyle = '#0a2d6e';
    ctx.font = 'bold 8px Arial';
    ctx.fillText('AQUA SAFE RO', W - 130, sigY - 65);
    ctx.fillText('VISAKHAPATNAM', W - 130, sigY - 55);
    ctx.font = '18px Arial';
    ctx.fillText('💧', W - 130, sigY - 40);

    // Bottom watermark text
    ctx.fillStyle = 'rgba(37,99,235,0.06)';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('AQUA SAFE RO', W / 2, H / 2 + 60);
  };

  useEffect(() => {
    drawCertificate();
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = () => {
    if (!formData.studentName || !formData.courseName || !formData.directorName || !formData.certNo) {
      alert('⚠️ Please fill in all required fields: Student Name, Certificate No, Course, and Director Name.');
      return;
    }
    setIsGenerated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const name = formData.studentName || 'student';
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [900, 650] });
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, 900, 650);
    pdf.save(`AquaSafeRO_Certificate_${name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight uppercase">Certificate <span className="text-primary">Generator</span></h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Technical Hub Administrative Portal</p>
            </div>
          </div>
          <p className="text-slate-600 font-bold max-w-2xl">
            Issue official Aqua Safe RO training certificates to your students. Fill in the details and download the professional PDF instantly.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Panel */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
              <CardHeader className="bg-slate-900 text-white p-8">
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle className="font-black font-headline uppercase tracking-tight">Student Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Student Name *</Label>
                    <Input id="studentName" value={formData.studentName} onChange={handleInputChange} className="h-12 rounded-xl bg-slate-50 border-slate-200" placeholder="e.g. Ravi Kumar" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Father's Name</Label>
                    <Input id="fatherName" value={formData.fatherName} onChange={handleInputChange} className="h-12 rounded-xl bg-slate-50 border-slate-200" placeholder="e.g. Suresh Kumar" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Certificate Number *</Label>
                    <Input id="certNo" value={formData.certNo} onChange={handleInputChange} className="h-12 rounded-xl bg-slate-50 border-slate-200" placeholder="e.g. ASRO/2024/001" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Issue Date *</Label>
                    <Input id="issueDate" type="date" value={formData.issueDate} onChange={handleInputChange} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Course / Training Program *</Label>
                  <Select onValueChange={(val) => handleSelectChange('courseName', val)}>
                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                      <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {COURSES.map((course) => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Duration</Label>
                    <Input id="duration" value={formData.duration} onChange={handleInputChange} className="h-12 rounded-xl bg-slate-50 border-slate-200" placeholder="e.g. 30 Days" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Grade</Label>
                    <Select defaultValue={formData.grade} onValueChange={(val) => handleSelectChange('grade', val)}>
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200">
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="A+ (Outstanding)">A+ (Outstanding)</SelectItem>
                        <SelectItem value="A (Excellent)">A (Excellent)</SelectItem>
                        <SelectItem value="B+ (Very Good)">B+ (Very Good)</SelectItem>
                        <SelectItem value="B (Good)">B (Good)</SelectItem>
                        <SelectItem value="Pass">Pass</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Instructor / Director Name *</Label>
                  <Input id="directorName" value={formData.directorName} onChange={handleInputChange} className="h-12 rounded-xl bg-slate-50 border-slate-200" placeholder="e.g. Dr. V. Ramakrishna" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Student Address (Optional)</Label>
                  <Textarea id="studentAddr" value={formData.studentAddr} onChange={handleInputChange} className="rounded-xl bg-slate-50 border-slate-200 p-4" placeholder="City, State" />
                </div>

                <Button onClick={handleGenerate} className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all border-none">
                  <PlusCircle className="mr-2 h-5 w-5" /> Generate Document
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-white">
                    <Clock className="h-4 w-4" />
                  </div>
                  <h3 className="font-black font-headline text-lg uppercase tracking-tight">Live <span className="text-primary">Preview</span></h3>
                </div>
                <Badge variant="outline" className="border-primary/20 text-primary font-black uppercase text-[10px]">Landscape 900x650</Badge>
              </div>

              <div className="bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
                <canvas 
                  ref={canvasRef} 
                  width={900} 
                  height={650} 
                  className="w-full h-auto rounded-xl shadow-inner border border-slate-100"
                />
              </div>

              {isGenerated && (
                <Button onClick={handleDownload} className="w-full h-16 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black uppercase tracking-widest text-lg shadow-xl shadow-green-600/20 transition-all border-none animate-in fade-in slide-in-from-bottom-2">
                  <Download className="mr-2 h-6 w-6" /> Download PDF Certificate
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
