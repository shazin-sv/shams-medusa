import { clx, Button as MedusaButton } from "@medusajs/ui"

type ButtonProps = React.ComponentProps<typeof MedusaButton>

const Button = ({
  children,
  className: classNameProp,
  ...props
}: ButtonProps): React.ReactNode => {
  const variant = props.variant ?? "primary"

  const className = clx(
    "!rounded-full !border text-sm font-semibold normal-case transition",
    classNameProp,
    {
      "!border-[#f4b400] !bg-[#f4b400] !text-slate-950 hover:!border-[#d59a00] hover:!bg-[#d59a00]":
        variant === "primary" && !props.disabled,
      "!border-slate-900 !bg-slate-900 !text-white hover:!bg-black":
        variant === "secondary" && !props.disabled,
      "!border-slate-300 !bg-white !text-slate-900 hover:!bg-slate-50":
        variant === "transparent",
      "!border-slate-200 !bg-slate-100 !text-slate-400": props.disabled,
    }
  )

  return (
    <MedusaButton className={className} variant={variant} {...props}>
      {children}
    </MedusaButton>
  )
}

export default Button
