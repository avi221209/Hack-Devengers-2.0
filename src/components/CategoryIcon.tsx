import React from "react";
import {
  Scissors,
  GraduationCap,
  Stethoscope,
  Wrench,
  Utensils,
  Sparkles,
  Store,
  LucideProps,
} from "lucide-react";
import { BusinessCategory } from "@/lib/types";

interface Props extends LucideProps {
  category: BusinessCategory | string;
}

export function CategoryIcon({ category, ...props }: Props) {
  switch (category) {
    case "Tailoring":
      return <Scissors {...props} />;
    case "Tuition/Education":
      return <GraduationCap {...props} />;
    case "Clinic/Healthcare":
      return <Stethoscope {...props} />;
    case "Mechanic/Repair":
      return <Wrench {...props} />;
    case "Food/Catering":
      return <Utensils {...props} />;
    case "Salon/Beauty":
      return <Sparkles {...props} />;
    default:
      return <Store {...props} />;
  }
}
