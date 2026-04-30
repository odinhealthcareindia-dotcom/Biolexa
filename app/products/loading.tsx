// "use client"
import { Spinner } from "@/components/ui/spinner"
// import { DNA } from "react-loader-spinner"

export default function Loading() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Spinner className="size-8 mx-auto mb-4" />
        {/* <DNA
          visible={true}
          height="160"
          width="160"
          dnaColorOne="#00285f"
          dnaColorTwo="#ee560c"
          ariaLabel="Product-loading"
          wrapperStyle={{margin: '0 auto',marginBottom: '1rem'}}
          wrapperClass="dna-wrapper"
        /> */}
        <h2 className="text-xl font-semibold mb-2">Loading Products</h2>
        <p className="text-muted-foreground">Please wait while we load our product catalog...</p>
      </div>
    </main>
  )
}
