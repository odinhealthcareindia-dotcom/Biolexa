"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { type Product } from "@/utils/products"

const PURPOSE_OPTIONS = ["Personal Use", "Retailer", "Distributor (Wholesale)"] as const
type Purpose = (typeof PURPOSE_OPTIONS)[number]

interface FormValues {
  name: string
  requiredFor: Purpose | ""
  state: string
  district: string
  pinCode: string
}

interface FormErrors {
  name?: string
  requiredFor?: string
  state?: string
  district?: string
  pinCode?: string
}

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

const ease = [0.25, 0.1, 0.25, 1] as const

const EMPTY_FORM: FormValues = {
  name: "",
  requiredFor: "",
  state: "",
  district: "",
  pinCode: "",
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = "Name is required."
  if (!values.requiredFor) errors.requiredFor = "Please select a purpose."
  if (!values.state.trim()) errors.state = "State is required."
  if (!values.district.trim()) errors.district = "District is required."
  if (!values.pinCode.trim()) {
    errors.pinCode = "Pin code is required."
  } else if (!/^\d{6}$/.test(values.pinCode)) {
    errors.pinCode = "Pin code must be exactly 6 digits."
  }
  return errors
}

export default function EnquiryModal({ isOpen, onClose, product }: EnquiryModalProps) {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const firstInputRef = useRef<HTMLInputElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      setForm(EMPTY_FORM)
      setErrors({})
      setTimeout(() => firstInputRef.current?.focus(), 80)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    const message = encodeURIComponent(
      `Hi, I am ${form.name} from ${form.district}, ${form.state} - ${form.pinCode}. I am enquiring as a ${form.requiredFor}. Can I know more about ${product?.Name} (${product?.Category})?`
    )
    window.open(`https://wa.me/9218630464?text=${message}`, "_blank", "noopener,noreferrer")
    onClose()
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
  const labelClass = "block text-sm font-medium text-[var(--color-text-primary)] mb-1"
  const errorClass = "text-xs text-red-500 mt-1"

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 h-screen"
            aria-hidden="true"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22, ease }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none"
            aria-modal="true"
            role="dialog"
            aria-labelledby="enquiry-modal-title"
          >
            <div
              className="pointer-events-auto w-full sm:max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-t-2xl sm:rounded-xl shadow-2xl flex flex-col max-h-[90dvh] sm:max-h-[85dvh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4 border-b border-[var(--color-border)] shrink-0">
                <div>
                  <h2
                    id="enquiry-modal-title"
                    className="text-lg font-semibold text-[var(--color-text-primary)] leading-snug"
                  >
                    {product?.Name}
                  </h2>
                  <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                    Please fill in your details to proceed
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="ml-4 mt-0.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="p-6 space-y-4 overflow-y-auto">
                {/* Name */}
                <div>
                  <label htmlFor="enq-name" className={labelClass}>
                    Name
                  </label>
                  <input
                    ref={firstInputRef}
                    id="enq-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                    autoComplete="name"
                  />
                  {errors.name && <p className={errorClass}>{errors.name}</p>}
                </div>

                {/* Required For */}
                <div>
                  <label htmlFor="enq-requiredFor" className={labelClass}>
                    Required For
                  </label>
                  <select
                    id="enq-requiredFor"
                    name="requiredFor"
                    value={form.requiredFor}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>
                      Select purpose
                    </option>
                    {PURPOSE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.requiredFor && <p className={errorClass}>{errors.requiredFor}</p>}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="enq-state" className={labelClass}>
                    State
                  </label>
                  <input
                    id="enq-state"
                    name="state"
                    type="text"
                    placeholder="Enter your state"
                    value={form.state}
                    onChange={handleChange}
                    className={inputClass}
                    autoComplete="address-level1"
                  />
                  {errors.state && <p className={errorClass}>{errors.state}</p>}
                </div>

                {/* District */}
                <div>
                  <label htmlFor="enq-district" className={labelClass}>
                    District
                  </label>
                  <input
                    id="enq-district"
                    name="district"
                    type="text"
                    placeholder="Enter your district"
                    value={form.district}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.district && <p className={errorClass}>{errors.district}</p>}
                </div>

                {/* Pin Code */}
                <div>
                  <label htmlFor="enq-pinCode" className={labelClass}>
                    Pin Code
                  </label>
                  <input
                    id="enq-pinCode"
                    name="pinCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="Enter 6-digit pin code"
                    value={form.pinCode}
                    onChange={handleChange}
                    className={inputClass}
                    autoComplete="postal-code"
                  />
                  {errors.pinCode && <p className={errorClass}>{errors.pinCode}</p>}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-2 rounded-lg font-medium transition-colors"
                    style={{ transition: "background-color 0.3s ease" }}
                  >
                    Send Enquiry on WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)] py-2 rounded-lg font-medium transition-colors"
                    style={{ transition: "background-color 0.3s ease" }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  if (!mounted) return null
  return createPortal(modal, document.body)
}
