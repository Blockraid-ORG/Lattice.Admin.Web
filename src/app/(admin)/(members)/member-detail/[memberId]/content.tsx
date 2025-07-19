'use client'

import { useDetailMember } from "@/modules/members/useMembers"
import { useParams } from "next/navigation"
import RowItem from "./row-item"
import VerificationLog from "./verification-log"
import { Button } from "@/components/ui/button"
import { FormChangeType } from "./form-change-type"
import { FormChangeCategory } from "./form-change-category"
import Link from "next/link"
import { toUrlAsset } from "@/lib/utils"
import { FormReject } from "../../form-reject"
import { FormApprove } from "../../form-approve"
// import PermissionContainer from "@/components/permission-container"

export default function DetailContent() {
  const { memberId } = useParams()
  const { data } = useDetailMember(memberId as string)
  return (
    <>
      {
        data && (
          <>
            <div className="flex justify-end gap-2 mb-4">
              {/* <PermissionContainer permission="POST_member-verifications/reject"> */}
              <FormReject userId={data.id} />
              {/* </PermissionContainer> */}
              {/* <PermissionContainer permission="POST_member-verifications/approve"> */}
              <FormApprove userId={data.id} />
              {/* </PermissionContainer> */}
            </div>
            <RowItem label="Name" value={data?.fullname ?? '-'} />
            <RowItem label="Wallet Address" value={data?.walletAddress ?? '-'} />
            <RowItem label="Email" value={data?.email ?? '-'} />
            <RowItem label="Category" value={data.category ?? '-'} />
            <RowItem label="Type" value={data.type ?? '-'} />
            <RowItem label="Status" value={data.verification?.status ?? '-'} />
            <div className="flex gap-2">
              <FormChangeCategory userId={data.id} category={data.category} />
              <FormChangeType userId={data.id} type={data.type} />
            </div>
            <div className="mt-6 border-2 p-6 rounded-lg border-dashed bg-primary-foreground">
              <h2 className="mb-2 text-lg font-semibold">Review Document</h2>
              <div className="flex gap-2 flex-wrap">
                {data.verification?.idCard && (
                  <Button variant={"outline"} asChild>
                    <Link href={toUrlAsset(data.verification?.idCard)} target="_blank" rel="noopener noreferrer">ID CARD</Link>
                  </Button>
                )}
                {data.verification?.selfie && (
                  <Button variant={"outline"} asChild>
                    <Link href={toUrlAsset(data.verification?.selfie)} target="_blank" rel="noopener noreferrer">
                      PHOTO/SELFIE
                    </Link>
                  </Button>
                )}
                {data.verification?.bisnisLicense && (
                  <Button variant={"outline"} asChild>
                    <Link href={toUrlAsset(data.verification?.bisnisLicense)} target="_blank" rel="noopener noreferrer">
                      BUSSINESS LICENSE
                    </Link>
                  </Button>
                )}
                {data.verification?.taxId && (
                  <Button variant={"outline"} asChild>
                    <Link href={toUrlAsset(data.verification?.taxId)} target="_blank" rel="noopener noreferrer">
                      TAX ID
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="mb-6">
              {
                data.verification?.logs && (
                  <VerificationLog data={data.verification.logs} />
                )
              }
            </div>
          </>
        )
      }
    </>
  )
}
