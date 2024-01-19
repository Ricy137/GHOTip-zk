'use client'
import { FC, useMemo } from 'react'
import { STREAM_STATUS, Streams, streamState } from '@/services/stream'
import { useRouter } from 'next/navigation'
import { StreamFeatures } from '@/components/StreamFeatures'
import Button from '@/components/Button'
import { useAtom } from 'jotai'

const StreamCard: FC<Streams> = ({
  streamer,
  audience,
  status,
  cost,
  description,
  id,
}) => {
  const router = useRouter()
  const [stream] = useAtom(streamState)

  // useEffect(() => {
  //     if (!stream) return;
  //     const streamCopy = _.cloneDeep(stream);
  //     console.log(streamCopy)
  // }, [stream,streamState]);

  // const handleDisabled = useMemo(() => {
  //   if (status === STREAM_STATUS.LIVE) {
  //     return false
  //   }
  //   if (status === STREAM_STATUS.UPCOMING) {
  //     return true
  //   }
  // }, [stream])

  // const handleClick = () => {
  //   if (status === STREAM_STATUS.LIVE) {
  //     router.push(`/view/${stream?.playbackId}`)
  //   }
  //   if (status === STREAM_STATUS.UPCOMING) {
  //     // TODO: Add notification
  //   }
  // }

  return (
    <div className="flex w-[403px] h-[238px] relative bg-white bg-opacity-10 rounded-xl shadow border border-white border-opacity-60 gap-1">
      <div className="flex justify-center relative pt-[1.5rem] w-[30vw]">
        <div className="bg-avatar w-[4rem] h-[4rem] bg-neutral-900 rounded-[51px]" />
      </div>
      <div className="flex flex-col space-y-3 v-full w-[70vw] pt-[1.5rem] pr-[1.5rem]">
        <h1 className="text-white text-xl font-medium">{streamer}</h1>
        <div className="flex flex-col space-y-6">
          <span className="text-white text-xs font-normal">{description}</span>
          <StreamFeatures status={status} audience={audience} />
          <Button
            fullWidth
            color="amber"
            // onClick={handleClick}
            // disabled={handleDisabled}
          >
            <p className="text-gray-900 text-sm font-semibold font-['Inter'] leading-tight">
              {status === STREAM_STATUS.LIVE
                ? `Join for ${cost} ETH`
                : 'Notify me'}
            </p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { StreamCard }
