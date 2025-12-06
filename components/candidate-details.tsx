"use client";

import type { Candidate } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Linkedin, Briefcase, GraduationCap, Check, X, Pause, Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


interface CandidateDetailsProps {
  candidate: Candidate | null;
  onStatusChange: (candidateId: string, newStatus: Candidate['status']) => void;
  onEditStatus: (candidate: Candidate) => void;
}

const InfoRow = ({ label, value, icon }: { label: string, value: React.ReactNode, icon?: React.ReactNode }) => (
    <div className="flex justify-between items-start text-sm py-1">
        <p className="text-muted-foreground flex items-center gap-2">{icon}{label}</p>
        <div className="font-medium text-foreground text-right break-all">{value}</div>
    </div>
);

export function CandidateDetails({ candidate, onStatusChange, onEditStatus }: CandidateDetailsProps) {
  if (!candidate) {
    return (
      <div className="flex h-full items-center justify-center text-center">
        <div>
          <p className="text-lg font-semibold">Select an employee</p>
          <p className="text-sm text-muted-foreground">Employee details will appear here.</p>
        </div>
      </div>
    );
  }

  const matchingSkills = candidate.skills.filter(skill => candidate.topics.includes(skill));
  const skillMatchPercentage = candidate.topics.length > 0 ? (matchingSkills.length / candidate.topics.length) * 100 : 0;
  
  const renderStatusButtons = () => {
    switch (candidate?.status) {
      case 'On Hold':
        return (
          <div className="flex justify-center gap-2 mt-4">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 hover:bg-green-600 text-white h-9 px-3" onClick={() => onStatusChange(candidate.id, 'Selected')}>
              <Check className="mr-2 h-4 w-4" /> Selected
            </button>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3" onClick={() => onStatusChange(candidate.id, 'Rejected')}>
              <X className="mr-2 h-4 w-4" /> Rejected
            </button>
          </div>
        );
      case 'Selected':
        return (
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Badge className="bg-green-100 text-green-800 border-green-300 text-base py-2 px-4">
                  <Check className="mr-2 h-4 w-4" /> Selected
              </Badge>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10" onClick={() => onEditStatus(candidate)}>
                  <Pencil className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        );
      case 'Rejected':
        return (
          <div className="mt-4 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2">
                <Badge variant="destructive" className="text-base py-2 px-4">
                    <X className="mr-2 h-4 w-4" /> Rejected
                </Badge>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10" onClick={() => onEditStatus(candidate)}>
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 border-4 border-card shadow-md">
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold mt-4">{candidate.name}</h2>
        {candidate.experience.length > 0 && (
          <p className="text-muted-foreground">{candidate.experience[0].role}</p>
        )}
      </div>

      {renderStatusButtons()}
      
      <div className="space-y-6 mt-6">
        <Separator />

        <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <div className="space-y-1">
                <InfoRow label="Phone" value={candidate.phone} />
                <InfoRow label="Email" value={<a href={`mailto:${candidate.email}`} className="text-primary hover:underline">{candidate.email}</a>} />
                <InfoRow 
                    label="LinkedIn" 
                    value={<a href={`https://${candidate.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 justify-end">{candidate.linkedin} <Linkedin className="h-4 w-4" /></a>}
                />
            </div>
        </div>
        
        <Separator />

        <div className="space-y-4">
          <div>
              <h4 className="text-sm font-semibold mb-2">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                  {candidate.topics.map(topic => (
                      <Badge key={topic} variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">{topic}</Badge>
                  ))}
              </div>
          </div>

          <div>
              <h4 className="text-sm font-semibold mb-2">User Skills</h4>
              <div className="flex flex-wrap gap-2">
                  {candidate.skills.map(skill => (
                      <Badge 
                        key={skill} 
                        variant="outline" 
                        className={
                          matchingSkills.includes(skill)
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-muted text-muted-foreground border"
                        }
                      >
                        {skill}
                      </Badge>
                  ))}
              </div>
          </div>

          <div>
              <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold">Skill Match</p>
                  <p className="text-sm font-bold text-foreground">{Math.round(skillMatchPercentage)}%</p>
              </div>
              <Progress value={skillMatchPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">You have completed {Math.round(skillMatchPercentage)}% of the required skills for this job.</p>
          </div>
        </div>

        <Separator />
        
        <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Experience
            </h3>
            <div className="space-y-4">
              {candidate.experience.map((exp, index) => (
                <div key={index} className="pl-2 relative">
                  <div className="absolute left-0 h-full w-0.5 bg-border -translate-x-1.5"></div>
                   <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary -translate-x-2"></div>
                  <p className="font-semibold">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">{exp.company} • {exp.years}</p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
        </div>

        <Separator />
        
        <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="space-y-3">
              {candidate.education.map((edu, index) => (
                <div key={index}>
                  <p className="font-semibold">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.degree} • {edu.years}</p>
                </div>
              ))}
            </div>
        </div>

        <Separator />
        
        <InfoRow 
            label="CADD Score" 
            value={
                <div className="flex items-center gap-1.5">
                   <Star className="h-4 w-4 text-primary fill-current" />
                   <span className="font-bold text-base">{candidate.caddScore}</span>
                </div>
            } 
        />
      </div>
    </div>
  );
}
