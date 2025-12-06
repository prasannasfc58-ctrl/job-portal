
"use client";

import type { Candidate } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { SkillMatchChart } from './skill-match-chart';
import { useIsMobile } from '@/hooks/use-mobile';

interface EmployeeTableProps {
  candidates: Candidate[];
  selectedCandidateId: string | null;
  onSelectCandidate: (id: string) => void;
}

export function EmployeeTable({ candidates, selectedCandidateId, onSelectCandidate }: EmployeeTableProps) {
  const isMobile = useIsMobile();
  return (
    <Table>
      <TableHeader className="sticky top-0 bg-card z-10">
        <TableRow className="bg-muted/50 hover:bg-muted/50">
          <TableHead className="w-[250px] p-4">Name</TableHead>
          {!isMobile && <TableHead className="p-4">Email</TableHead>}
          <TableHead className="p-4">Skills</TableHead>
          {!isMobile && <TableHead className="p-4">CADD Score</TableHead>}
          {!isMobile && <TableHead className="p-4">Location</TableHead>}
          <TableHead className="p-4">Skill Match</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map(candidate => {
          const matchingSkills = candidate.skills.filter(skill => candidate.topics.includes(skill));
          const skillMatchPercentage = candidate.topics.length > 0 ? Math.round((matchingSkills.length / candidate.topics.length) * 100) : 0;
          
          return (
            <TableRow 
              key={candidate.id}
              className={cn("cursor-pointer", selectedCandidateId === candidate.id && "bg-primary/10 hover:bg-primary/10")}
              onClick={() => onSelectCandidate(candidate.id)}
            >
              <TableCell className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.phone}</p>
                  </div>
                </div>
              </TableCell>
              {!isMobile && <TableCell className="p-4">{candidate.email}</TableCell>}
              <TableCell className="p-4">
                <div className="flex flex-wrap items-center gap-1">
                  {candidate.skills.slice(0, isMobile ? 1 : 2).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                  {candidate.skills.length > (isMobile ? 1 : 2) && (
                    <Badge variant="outline" className="text-xs font-medium">
                      +{candidate.skills.length - (isMobile ? 1 : 2)}
                    </Badge>
                  )}
                </div>
              </TableCell>
              {!isMobile && <TableCell className="p-4">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span className="font-semibold">{candidate.caddScore}</span>
                </div>
              </TableCell>}
              {!isMobile && <TableCell className="p-4">{candidate.location}</TableCell>}
              <TableCell className="p-4">
                <div className="flex items-center gap-2">
                  <SkillMatchChart value={skillMatchPercentage} />
                  <span className="font-semibold text-sm">{skillMatchPercentage}%</span>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
         {candidates.length === 0 && (
          <TableRow>
            <TableCell colSpan={isMobile ? 4 : 6} className="h-24 text-center">
              No employees found matching your criteria.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
