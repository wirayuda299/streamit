import Image from "next/image";
import {useSession} from "next-auth/react";

const UserImage = () => {
    const {data: session} = useSession()
    return (
      <div>
          <Image
            width={50}
            alt={session?.user.name ?? 'user photo profile'}
            className={'rounded-full w-10 h-10'}
            src={session?.user.image ?? ''}
            height={50}
            priority
            fetchPriority={'auto'}
            title={session?.user.name ?? ''}
          />
      </div>
    )
}
export default  UserImage