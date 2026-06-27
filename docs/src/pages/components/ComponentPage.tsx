import { useParams, Navigate, Link } from "react-router-dom";
import { COMPONENTS } from "../../data/components";
import {
  ButtonPage, BadgePage, InputPage, CheckboxPage, SwitchPage,
  SelectPage, TextareaPage, SliderPage, RatingPage, TogglePage,
  NumberInputPage, InputOTPPage,
} from "./InputPages";
import {
  AvatarPage, SkeletonPage, ProgressPage, StatPage,
  AlertPage, ToastPage, DialogPage, TabsPage, AccordionPage,
  CardPage, TooltipPage,
  SpotlightPage, MarqueePage, TypewriterEffectPage, AuroraBackgroundPage,
  GenericComponentPage,
} from "./OtherPages";
import {
  ButtonGroupPage, IconButtonPage, FABPage, RadioGroupPage,
  AutocompletePage, DatePickerPage, InputGroupPage, FileUploadPage,
  ToggleGroupPage, CalendarPage,
  TypographyPage, ChipPage, TagPage, TablePage, DataTablePage,
  ListPage, TimelinePage, LinearProgressPage, KBDPage, LinkPage,
  EmptyStatePage, CodeBlockPage,
  SnackbarPage, AlertDialogPage, DrawerPage, SpinnerPage, PopoverPage,
  BreadcrumbPage, PaginationPage, StepperPage, DropdownPage,
  CommandPage, NavigationMenuPage, FloatingNavPage,
  BoxPage, ContainerPage, StackPage, GridPage, DividerPage,
  AspectRatioPage, ScrollAreaPage, ResizablePage,
  PaperPage, AppBarPage, SidebarPage,
  GlowCardPage, BackgroundBeamsPage, WavyBackgroundPage,
  MovingBorderPage, ThreeDCardPage, CardSpotlightPage,
  CarouselPage, ComparePage, TracingBeamPage,
  InfiniteMovingCardsPage, FocusCardsPage, ExpandableCardsPage,
  FloatingDockPage, AnimatedTestimonialsPage,
  SparklesPage, LampEffectPage, ContainerTextFlipPage, SpeedDialPage,
} from "./MorePages";

const PAGE_MAP: Record<string, React.ComponentType> = {
  // Inputs
  "button":               ButtonPage,
  "button-group":         ButtonGroupPage,
  "icon-button":          IconButtonPage,
  "fab":                  FABPage,
  "input":                InputPage,
  "textarea":             TextareaPage,
  "select":               SelectPage,
  "checkbox":             CheckboxPage,
  "radio-group":          RadioGroupPage,
  "switch":               SwitchPage,
  "slider":               SliderPage,
  "number-input":         NumberInputPage,
  "autocomplete":         AutocompletePage,
  "date-picker":          DatePickerPage,
  "input-group":          InputGroupPage,
  "input-otp":            InputOTPPage,
  "file-upload":          FileUploadPage,
  "toggle":               TogglePage,
  "toggle-group":         ToggleGroupPage,
  "rating":               RatingPage,
  "calendar":             CalendarPage,
  // Display
  "typography":           TypographyPage,
  "badge":                BadgePage,
  "chip":                 ChipPage,
  "tag":                  TagPage,
  "avatar":               AvatarPage,
  "table":                TablePage,
  "data-table":           DataTablePage,
  "list":                 ListPage,
  "timeline":             TimelinePage,
  "stat":                 StatPage,
  "progress":             ProgressPage,
  "linear-progress":      LinearProgressPage,
  "skeleton":             SkeletonPage,
  "kbd":                  KBDPage,
  "link":                 LinkPage,
  "empty-state":          EmptyStatePage,
  "code-block":           CodeBlockPage,
  // Feedback
  "alert":                AlertPage,
  "toast":                ToastPage,
  "snackbar":             SnackbarPage,
  "dialog":               DialogPage,
  "alert-dialog":         AlertDialogPage,
  "drawer":               DrawerPage,
  "spinner":              SpinnerPage,
  "tooltip":              TooltipPage,
  "popover":              PopoverPage,
  // Navigation
  "tabs":                 TabsPage,
  "accordion":            AccordionPage,
  "breadcrumb":           BreadcrumbPage,
  "pagination":           PaginationPage,
  "stepper":              StepperPage,
  "dropdown":             DropdownPage,
  "command":              CommandPage,
  "navigation-menu":      NavigationMenuPage,
  "floating-nav":         FloatingNavPage,
  // Layout
  "box":                  BoxPage,
  "container":            ContainerPage,
  "stack":                StackPage,
  "grid":                 GridPage,
  "divider":              DividerPage,
  "aspect-ratio":         AspectRatioPage,
  "scroll-area":          ScrollAreaPage,
  "resizable":            ResizablePage,
  // Surfaces
  "card":                 CardPage,
  "paper":                PaperPage,
  "app-bar":              AppBarPage,
  "sidebar":              SidebarPage,
  // Animated
  "spotlight":            SpotlightPage,
  "glow-card":            GlowCardPage,
  "marquee":              MarqueePage,
  "typewriter-effect":    TypewriterEffectPage,
  "aurora-background":    AuroraBackgroundPage,
  "background-beams":     BackgroundBeamsPage,
  "wavy-background":      WavyBackgroundPage,
  "moving-border":        MovingBorderPage,
  "three-d-card":         ThreeDCardPage,
  "card-spotlight":       CardSpotlightPage,
  "carousel":             CarouselPage,
  "compare":              ComparePage,
  "tracing-beam":         TracingBeamPage,
  "infinite-moving-cards":InfiniteMovingCardsPage,
  "focus-cards":          FocusCardsPage,
  "expandable-cards":     ExpandableCardsPage,
  "floating-dock":        FloatingDockPage,
  "animated-testimonials":AnimatedTestimonialsPage,
  "sparkles":             SparklesPage,
  "lamp-effect":          LampEffectPage,
  "container-text-flip":  ContainerTextFlipPage,
  "speed-dial":           SpeedDialPage,
};

export const ComponentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/" replace />;

  const meta = COMPONENTS.find(c => c.slug === slug);
  if (!meta) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-6xl">🔍</p>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Component not found</h2>
      <p className="text-gray-500">No component with slug "{slug}" exists in the registry.</p>
      <Link to="/" className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors text-sm font-medium">Go Home</Link>
    </div>
  );

  const Page = PAGE_MAP[slug];
  if (Page) return <Page />;

  // Fallback — should rarely be hit now that all 90 components are mapped
  return <GenericComponentPage slug={slug} />;
};
