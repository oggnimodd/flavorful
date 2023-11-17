import React, { forwardRef } from "react";
import {
  Pressable,
  Text,
  type PressableProps,
  type TextProps,
  type View,
} from "react-native";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import tw from "twrnc";

const buttonCva = cva("flex items-center justify-center rounded font-medium", {
  variants: {
    variant: {
      primary: "bg-blue-500",
      secondary: "bg-green-500",
      danger: "bg-red-500",
    },
    size: {
      sm: "px-3 py-2",
      md: "px-4 py-2",
      lg: "px-5 py-3",
      xl: "px-6 py-4",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
    isDisabled: {
      true: "opacity-40",
    },
    isRounded: {
      true: "rounded-full",
    },
    isAspectSquare: {
      true: "aspect-square",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
    fullWidth: false,
    isDisabled: false,
    isRounded: false,
    isAspectSquare: false,
  },
});

const textCva = cva("text-white font-medium", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    isAspectSquare: {
      true: "aspect-square text-center",
    },
  },
  defaultVariants: {
    size: "sm",
    isAspectSquare: false,
  },
});

export interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonCva> {
  children?: TextProps["children"];
  tailwind?: string;
  title?: string;
}

const Button = forwardRef<View, ButtonProps>(
  ({ children, title, ...props }, ref) => {
    const {
      variant,
      size,
      fullWidth,
      isDisabled,
      isRounded,
      isAspectSquare,
      tailwind,
    } = props;

    const buttonStyles = clsx(
      buttonCva({
        variant,
        size,
        fullWidth,
        isRounded,
        isAspectSquare,
        isDisabled,
      }),
      tailwind,
    );

    const buttonTextStyles = clsx(textCva({ size, isAspectSquare }));

    return (
      <Pressable
        disabled={isDisabled}
        style={tw`${buttonStyles}`}
        {...props}
        ref={ref}
      >
        <Text style={tw`${buttonTextStyles}`}>{children || title}</Text>
      </Pressable>
    );
  },
);

export default Button;
