import { Input } from "@/components/ui/input";
import { PipelineItem } from "./pipe-item";
import { Search } from "lucide-react";

export default function RunLogs() {
  return (
    <main className="container px-4 py-6 md:px-6 md:py-8">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search...."
          className="pl-10 w-full"
        />
      </div>

      <h1 className="text-2xl font-bold mb-6">Technical Commands</h1>

      <div className="space-y-4">
        <PipelineItem number={1} />
        <PipelineItem number={2} />
        <PipelineItem number={3} />
        <PipelineItem number={4} />
      </div>
    </main>
  );
}
