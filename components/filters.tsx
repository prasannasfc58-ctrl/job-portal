
"use client";

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import type { Candidate } from '@/lib/types';

interface FiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    allStatuses: Candidate['status'][];
    courseFilter: string;
    setCourseFilter: (value: string) => void;
    allCourses: string[];
    skillPercentageFilter: number[];
    setSkillPercentageFilter: (value: number[]) => void;
}

export function Filters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    allStatuses,
    courseFilter,
    setCourseFilter,
    allCourses,
    skillPercentageFilter,
    setSkillPercentageFilter
}: FiltersProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 items-end">
            <div>
                <Label htmlFor="search-name">Filter by Name</Label>
                <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="search-name"
                        placeholder="e.g. Elena Vance"
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="status-filter">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="status-filter" className="w-full mt-1">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Statuses</SelectItem>
                        {allStatuses.map(status => (
                            <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="course-filter">Course</Label>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger id="course-filter" className="w-full mt-1">
                        <SelectValue placeholder="Filter by Course" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Courses</SelectItem>
                        {allCourses.map(course => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Skills Percentage: {skillPercentageFilter[0]}% - {skillPercentageFilter[1]}%</Label>
                <Slider
                    value={skillPercentageFilter}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => setSkillPercentageFilter(value)}
                    className="mt-1 pt-2"
                />
            </div>
        </div>
    );
}
