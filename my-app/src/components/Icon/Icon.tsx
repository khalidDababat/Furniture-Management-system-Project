"use client";

// Maps the icon keys stored in db.json to Material UI Icons (rounded variants).
import type { SvgIconProps } from "@mui/material/SvgIcon";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";
import WorkspacePremiumRounded from "@mui/icons-material/WorkspacePremiumRounded";
import DiamondRounded from "@mui/icons-material/DiamondRounded";
import PrecisionManufacturingRounded from "@mui/icons-material/PrecisionManufacturingRounded";
import EngineeringRounded from "@mui/icons-material/EngineeringRounded";
import HandymanRounded from "@mui/icons-material/HandymanRounded";
import LocalShippingRounded from "@mui/icons-material/LocalShippingRounded";
import ArchitectureRounded from "@mui/icons-material/ArchitectureRounded";
import BuildRounded from "@mui/icons-material/BuildRounded";
import ForumRounded from "@mui/icons-material/ForumRounded";
import DesignServicesRounded from "@mui/icons-material/DesignServicesRounded";
import ViewInArRounded from "@mui/icons-material/ViewInArRounded";
import DrawRounded from "@mui/icons-material/DrawRounded";
import FormatPaintRounded from "@mui/icons-material/FormatPaintRounded";
import FactCheckRounded from "@mui/icons-material/FactCheckRounded";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import HelpOutlineRounded from "@mui/icons-material/HelpOutlineRounded";
import type { ComponentType } from "react";

const MAP: Record<string, ComponentType<SvgIconProps>> = {
  verified: VerifiedRounded,
  workspace_premium: WorkspacePremiumRounded,
  diamond: DiamondRounded,
  precision_manufacturing: PrecisionManufacturingRounded,
  engineering: EngineeringRounded,
  handyman: HandymanRounded,
  local_shipping: LocalShippingRounded,
  architecture: ArchitectureRounded,
  build: BuildRounded,
  forum: ForumRounded,
  design_services: DesignServicesRounded,
  view_in_ar: ViewInArRounded,
  draw: DrawRounded,
  format_paint: FormatPaintRounded,
  fact_check: FactCheckRounded,
  check_circle: CheckCircleRounded,
};

export default function Icon({ name, ...props }: { name: string } & SvgIconProps) {
  const Cmp = MAP[name] || HelpOutlineRounded;
  return <Cmp {...props} />;
}
