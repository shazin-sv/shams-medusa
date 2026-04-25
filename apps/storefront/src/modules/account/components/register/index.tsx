"use client"

import { currencySymbolMap } from "@/lib/constants"
import { signup } from "@/lib/data/customer"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import Input from "@/modules/common/components/input"
import { HttpTypes } from "@medusajs/types"
import { Checkbox, Label, Select, Text } from "@medusajs/ui"
import { ChangeEvent, useActionState, useMemo, useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  regions: HttpTypes.StoreRegion[]
}

interface FormData {
  account_type: "normal" | "business"
  email: string
  first_name: string
  last_name: string
  phone: string
  company_name: string
  password: string
  company_address: string
  company_city: string
  company_state: string
  company_zip: string
  company_country: string
  currency_code: string
}

const initialFormData: FormData = {
  account_type: "normal",
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  company_name: "",
  password: "",
  company_address: "",
  company_city: "",
  company_state: "",
  company_zip: "",
  company_country: "",
  currency_code: "",
}

const placeholder = ({
  placeholder,
  required,
}: {
  placeholder: string
  required: boolean
}) => {
  return (
    <span className="text-ui-fg-muted">
      {placeholder}
      {required && <span className="text-ui-fg-error">*</span>}
    </span>
  )
}

const Register = ({ setCurrentView, regions }: Props) => {
  const [message, formAction] = useActionState(signup, null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [formData, setFormData] = useState<FormData>(initialFormData)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const isBusinessAccount = formData.account_type === "business"

  const isValid = useMemo(() => {
    const baseValid =
      termsAccepted &&
      !!formData.email &&
      !!formData.first_name &&
      !!formData.last_name &&
      !!formData.password

    if (!isBusinessAccount) {
      return baseValid
    }

    return (
      baseValid &&
      !!formData.company_name &&
      !!formData.company_address &&
      !!formData.company_city &&
      !!formData.company_zip &&
      !!formData.company_country &&
      !!formData.currency_code
    )
  }, [formData, isBusinessAccount, termsAccepted])

  const countryNames = regions
    .flatMap((region) =>
      region.countries?.map((country) => country?.display_name || country?.name)
    )
    .filter((country) => country !== undefined)

  const currencies = regions.map((region) => region.currency_code)

  return (
    <div
      className="max-w-md flex flex-col items-start gap-2 my-8"
      data-testid="register-page"
    >
      <Text className="text-4xl text-neutral-950 text-left mb-2">
        Create your
        <br />
        Shamstools account.
      </Text>
      <p className="mb-4 text-sm leading-6 text-slate-500">
        Choose a personal account for standard checkout, or a business account for bulk ordering and quote workflows.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, account_type: "normal" }))}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              formData.account_type === "normal"
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="text-sm font-bold">Normal account</div>
            <div className={`mt-1 text-xs ${formData.account_type === "normal" ? "text-slate-300" : "text-slate-500"}`}>
              Fast personal checkout for regular retail orders.
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, account_type: "business" }))}
            className={`rounded-2xl border px-4 py-4 text-left transition ${
              formData.account_type === "business"
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <div className="text-sm font-bold">Business account</div>
            <div className={`mt-1 text-xs ${formData.account_type === "business" ? "text-slate-300" : "text-slate-500"}`}>
              Company-based access for quotes, bulk orders, and team buying.
            </div>
          </button>
        </div>

        <input type="hidden" name="account_type" value={formData.account_type} />

        <div className="flex flex-col w-full gap-y-4">
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
            className="bg-white"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="First name"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
            className="bg-white"
            value={formData.first_name}
            onChange={handleChange}
          />
          <Input
            label="Last name"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
            className="bg-white"
            value={formData.last_name}
            onChange={handleChange}
          />
          <Input
            label="Phone"
            name="phone"
            autoComplete="tel"
            data-testid="phone-input"
            className="bg-white"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
            className="bg-white"
            value={formData.password}
            onChange={handleChange}
          />

          {isBusinessAccount && (
            <>
              <Input
                label="Company name"
                name="company_name"
                required
                autoComplete="organization"
                data-testid="company-name-input"
                className="bg-white"
                value={formData.company_name}
                onChange={handleChange}
              />
              <Input
                label="Company address"
                name="company_address"
                required
                autoComplete="address"
                data-testid="company-address-input"
                className="bg-white"
                value={formData.company_address}
                onChange={handleChange}
              />
              <Input
                label="Company city"
                name="company_city"
                required
                autoComplete="city"
                data-testid="company-city-input"
                className="bg-white"
                value={formData.company_city}
                onChange={handleChange}
              />
              <Input
                label="Company state"
                name="company_state"
                autoComplete="state"
                data-testid="company-state-input"
                className="bg-white"
                value={formData.company_state}
                onChange={handleChange}
              />
              <Input
                label="Company zip"
                name="company_zip"
                required
                autoComplete="postal-code"
                data-testid="company-zip-input"
                className="bg-white"
                value={formData.company_zip}
                onChange={handleChange}
              />
              <Select
                name="company_country"
                required
                autoComplete="country"
                data-testid="company-country-input"
                value={formData.company_country}
                onValueChange={handleSelectChange("company_country")}
              >
                <Select.Trigger className="rounded-full h-10 px-4">
                  <Select.Value
                    placeholder={placeholder({
                      placeholder: "Select a country",
                      required: true,
                    })}
                  />
                </Select.Trigger>
                <Select.Content>
                  {countryNames?.map((country) => (
                    <Select.Item key={country} value={country}>
                      {country}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
              <Select
                name="currency_code"
                required
                autoComplete="currency"
                data-testid="company-currency-input"
                value={formData.currency_code}
                onValueChange={handleSelectChange("currency_code")}
              >
                <Select.Trigger className="rounded-full h-10 px-4">
                  <Select.Value
                    placeholder={placeholder({
                      placeholder: "Select a currency",
                      required: true,
                    })}
                  />
                </Select.Trigger>
                <Select.Content>
                  {[...new Set(currencies)].map((currency) => (
                    <Select.Item key={currency} value={currency}>
                      {currency.toUpperCase()} ({currencySymbolMap[currency]})
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </>
          )}
        </div>
        <div className="border-b border-neutral-200 my-6" />
        <ErrorMessage error={message} data-testid="register-error" />
        <div className="flex items-center gap-2">
          <Checkbox
            name="terms"
            id="terms-checkbox"
            data-testid="terms-checkbox"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
          ></Checkbox>
          <Label
            id="terms-label"
            className="flex items-center text-ui-fg-base !text-xs hover:cursor-pointer !transform-none"
            htmlFor="terms-checkbox"
            data-testid="terms-label"
          >
            I agree to the terms and conditions.
          </Label>
        </div>
        <SubmitButton
          className="w-full mt-6"
          data-testid="register-button"
          disabled={!isValid}
        >
          {isBusinessAccount ? "Create business account" : "Create account"}
        </SubmitButton>
      </form>
      <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.LOG_IN)}
          className="underline"
        >
          Log in
        </button>
        .
      </span>
    </div>
  )
}

export default Register
