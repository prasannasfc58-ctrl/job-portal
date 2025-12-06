"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { candidates as initialCandidates } from "@/lib/data";
import type { Candidate } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EditStatusDialog } from "@/components/edit-status-dialog";
import { EmployeeTable } from "@/components/employee-table";
import { CandidateDetails } from "@/components/candidate-details";
import { Filters } from "@/components/filters";

const allCourses = Array.from(
  new Set(initialCandidates.flatMap((c) => c.courses))
);
const allStatuses: Candidate["status"][] = ["On Hold", "Selected", "Rejected"];

export default function TalentTrackClientPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [skillPercentageFilter, setSkillPercentageFilter] = useState<[number, number]>([0, 100]);
  const [courseFilter, setCourseFilter] = useState("All");

  const [confirmation, setConfirmation] = useState<{
    isOpen: boolean;
    candidateId: string;
    newStatus: Candidate["status"];
  } | null>(null);

  const [editStatusCandidate, setEditStatusCandidate] = useState<Candidate | null>(null);
  const isMobile = useIsMobile();

  const filteredAndSortedCandidates = useMemo(() => {
    return candidates
      .filter((candidate) =>
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (candidate) =>
          statusFilter === "All" || candidate.status === statusFilter
      )
      .filter((candidate) => {
        const matchingSkills = candidate.skills.filter((skill) =>
          candidate.topics.includes(skill)
        );
        const skillMatchPercentage =
          candidate.topics.length > 0
            ? (matchingSkills.length / candidate.topics.length) * 100
            : 0;

        return (
          skillMatchPercentage >= skillPercentageFilter[0] &&
          skillMatchPercentage <= skillPercentageFilter[1]
        );
      })
      .filter(
        (candidate) =>
          courseFilter === "All" || candidate.courses.includes(courseFilter)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [candidates, searchTerm, statusFilter, skillPercentageFilter, courseFilter]);

  // --- FIXED selectedCandidateId effect ---
  const defaultSelectedCandidateId = useMemo(() => {
    if (!isMobile && filteredAndSortedCandidates.length > 0) {
      return filteredAndSortedCandidates[0].id;
    }
    return null;
  }, [filteredAndSortedCandidates, isMobile]);

  const didSetDefault = useRef(false);

  useEffect(() => {
    if (!didSetDefault.current) {
      didSetDefault.current = true;
      if (defaultSelectedCandidateId !== null) {
        setSelectedCandidateId(defaultSelectedCandidateId);
      }
    }
  }, [defaultSelectedCandidateId]);

  const selectedCandidate = useMemo(() => {
    return candidates.find((c) => c.id === selectedCandidateId) || null;
  }, [candidates, selectedCandidateId]);

  const handleStatusChangeRequest = (candidateId: string, newStatus: Candidate["status"]) => {
    setConfirmation({ isOpen: true, candidateId, newStatus });
  };

  const confirmStatusChange = () => {
    if (!confirmation) return;

    const { candidateId, newStatus } = confirmation;
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );

    setConfirmation(null);
    setEditStatusCandidate(null);

    if (isMobile) {
      setSelectedCandidateId(null);
    }
  };

  const cancelStatusChange = () => setConfirmation(null);

  const openEditStatusDialog = (candidate: Candidate) => setEditStatusCandidate(candidate);

  const handleSelectCandidate = (candidateId: string) => setSelectedCandidateId(candidateId);

  return (
    <>
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1 overflow-hidden">
            <main className="flex-1 p-2 md:p-6 flex flex-col">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full flex flex-col">
                <div className="flex flex-col space-y-1.5 p-6">
                  <h2 className="text-2xl font-semibold leading-none tracking-tight">
                    Student List
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    View and manage student profiles.
                  </p>
                </div>

                <div className="p-6 pt-0 flex flex-col flex-1 min-h-0">
                  <Filters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    allStatuses={allStatuses}
                    courseFilter={courseFilter}
                    setCourseFilter={setCourseFilter}
                    allCourses={allCourses}
                    skillPercentageFilter={skillPercentageFilter}
                    setSkillPercentageFilter={setSkillPercentageFilter}
                  />

                  <div className="flex-1 overflow-y-auto border rounded-lg">
                    <EmployeeTable
                      candidates={filteredAndSortedCandidates}
                      selectedCandidateId={selectedCandidateId}
                      onSelectCandidate={handleSelectCandidate}
                    />
                  </div>
                </div>
              </div>
            </main>

            {!isMobile && (
              <aside className="w-1/3 min-w-[350px] max-w-[450px] border rounded-lg bg-card overflow-y-auto p-6 mt-6">
                <CandidateDetails
                  candidate={selectedCandidate}
                  onStatusChange={handleStatusChangeRequest}
                  onEditStatus={openEditStatusDialog}
                />
              </aside>
            )}
          </div>
        </div>
      </div>

      {isMobile && (
        <Sheet
          open={!!selectedCandidate}
          onOpenChange={(open) => !open && setSelectedCandidateId(null)}
        >
          <SheetContent side="right" className="p-0 w-full max-w-full sm:max-w-full">
            <div className="overflow-y-auto h-full p-6">
              <CandidateDetails
                candidate={selectedCandidate}
                onStatusChange={handleStatusChangeRequest}
                onEditStatus={openEditStatusDialog}
              />
            </div>
          </SheetContent>
        </Sheet>
      )}

      <AlertDialog open={!!confirmation?.isOpen} onOpenChange={cancelStatusChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to update the status to &quot;{confirmation?.newStatus}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelStatusChange}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditStatusDialog
        candidate={editStatusCandidate}
        onOpenChange={() => setEditStatusCandidate(null)}
        onStatusChange={handleStatusChangeRequest}
      />
    </>
  );
}
