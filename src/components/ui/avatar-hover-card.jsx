"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const imageSizeVariants = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-40 h-40",
};

const cardWidthVariants = {
  sm: "w-56",
  md: "w-72",
  lg: "w-80",
  xl: "w-96",
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export function AvatarHoverCard({
  imageSrc,
  imageAlt,
  name,
  username,
  description,
  buttonText = "View Profile",
  onButtonClick,
  buttonContent,
  size = "md",
  className,
  variant = "default",
}) {
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case "glass":
        return "bg-background/80 backdrop-blur-md border border-border/50";
      case "bordered":
        return "bg-card border-2 border-primary/20";
      default:
        return "bg-card border border-border";
    }
  };

  const avatarElement = (
    <Avatar className="w-full h-full">
      <AvatarImage src={imageSrc || "/placeholder.svg"} alt={imageAlt || name} />
      <AvatarFallback>{getInitials(name)}</AvatarFallback>
    </Avatar>
  );

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={false}
      animate={{ width: isHovered ? "auto" : "fit-content" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className={cn("relative rounded-full overflow-hidden", imageSizeVariants[size])}
        layout
        animate={{ padding: isHovered ? "8px" : "0px" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {avatarElement}
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-0 left-0 rounded-xl shadow-lg overflow-hidden z-10",
              cardWidthVariants[size],
              getVariantStyles()
            )}
            style={{ pointerEvents: "auto" }}
          >
            <div className="relative">
              <motion.div className={cn("relative p-2", imageSizeVariants[size])}>
                {avatarElement}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="p-4 space-y-3"
              >
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-lg font-bold text-foreground leading-tight"
                  >
                    {name}
                  </motion.h3>
                  {username && (
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.18 }}
                      className="text-sm text-muted-foreground"
                    >
                      @{username}
                    </motion.p>
                  )}
                </div>
                {description && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-foreground/80 leading-relaxed line-clamp-2"
                  >
                    {description}
                  </motion.p>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {buttonContent ? (
                    buttonContent
                  ) : (
                    <Button onClick={onButtonClick} size="sm" className="w-full">
                      {buttonText}
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
