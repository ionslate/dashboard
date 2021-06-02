export default function Dashboard() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 grid grid-cols-3 gap-6">
        <div className="h-full col-span-2 grid grid-rows-4 gap-2">
          <div className="row-span-1 flex flex-col">
            <h2 className="text-xl  font-bold mb-2 text-gray-400">
              Published Version
            </h2>
            <div className="bg-gray-700 bg-opacity-40 rounded-md flex-1"></div>
          </div>
          <div className="row-span-3 flex flex-col">
            <h2 className="text-xl  font-bold mb-2 text-gray-400">Support</h2>
            <div className="bg-gray-700 bg-opacity-40 rounded-md flex-1"></div>
          </div>
        </div>
        <div className="h-full">
          <div className="h-full flex flex-col">
            <h2 className="text-xl  font-bold mb-2 text-gray-400">Activity</h2>
            <div className="flex-1 rounded-md bg-gray-700 bg-opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
