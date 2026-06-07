export default function PosttCard() {
  return (
    <div className="w-full px-4 py-3">
      <div className="relative flex items-center gap-6 rounded-xl border-t border-t-postgo-sec px-8 py-5">

        {/* Left Number */}
        <div className="text-gray-500 font-semibold">
          01
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-full bg-gray-300" />
          <p className="mt-2 text-sm font-medium">
            Author Name
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 bg-amber-400">
          <h2 className="text-lg font-bold">
            Post Title
          </h2>

          <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
            <span>10 min read</span>
            <span>Category Name</span>
          </div>

          <p className="mt-2 max-w-xl text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, fuga magnam sequi natus in nam fugiat harum adipisci deserunt enim perspiciatis iusto laudantium quis nostrum. Eveniet blanditiis et in impedit.
          </p>

          {/* Actions */}
          <div className="mt-4 flex gap-4 text-red-400">
            <button>👁</button>
            <button>✏️</button>
            <button>🗑</button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-14 text-sm text-gray-500">
          <span>25 min ago</span>
          <span>215</span>
          <span>215</span>
          <span>215</span>
        </div>
      </div>
    </div>
  )
}