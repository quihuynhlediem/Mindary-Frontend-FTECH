import { Card } from "@/components/ui/card"

const activities = [
  {
    title: 'Take a walk',
    description: 'Take a stroll around the local area and meet with other people',
  },
  {
    title: 'Connect with nature',
    description: 'Spend time outdoors with the nature and fresh air',
  },
  {
    title: 'Smile',
    description: 'put a smile on your face and to start to feel more positive',
  },
]

export default function MeditationTip() {
  return (
    <div className="p-4 rounded-lg">
      {/* Header with Tips and icon */}
      <div className="flex items-center mb-6">
        <div className="p-2 rounded-full bg-orange-100 mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
            <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
            <path d="M9 21v-1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z" />
          </svg>
        </div>
        <h1 className="text-3xl font-normal text-orange-300">Tips</h1>
      </div>

      {/* Activity cards with spacing */}
      <div className="space-y-4">
        {activities.map((act) => (
          <Card key={act.title} className="p-5 shadow-md rounded-xl">
            <h2 className="text-xl font-bold mb-1">{act.title}</h2>
            <p className="text-gray-700">{act.description}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
