import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

interface Pig {
  id: number
  name: string
  personality: string
  location: string
  dialog: string[]
  hasClue: boolean
}

// Spy Foundation Data
const SPY_LOCATIONS = [
  'Foundation Entrance',
  'Security Checkpoint',
  'Research Laboratory A',
  'Research Laboratory B', 
  'Mecha Assembly Floor',
  'Control Room',
  'Scientist Quarters',
  'Cafeteria',
  'Storage Facility',
  'Underground Bunker',
  'Communications Center',
  'Director Office'
]

const SPY_PIGS: Pig[] = [
  // Your Brother (reunited!)
  { id: 201, name: 'Your Brother', personality: 'Determined', location: 'Foundation Entrance', dialog: ['Brother! I found you!', 'This foundation is planning something terrible...', 'They want to create Mecha Pigzilla - a giant mechanical pig!'], hasClue: true },
  
  // Spy Pigs (undercover agents)
  { id: 202, name: 'Agent Sneak', personality: 'Stealthy', location: 'Security Checkpoint', dialog: ['Psst... I am undercover here.', 'The security is tight, but I know the weak spots.', 'Your brother discovered their main lab is in Section B.'], hasClue: true },
  { id: 203, name: 'Agent Shadow', personality: 'Mysterious', location: 'Research Laboratory A', dialog: ['I have been watching them for months.', 'They are building something massive in the assembly floor.', 'The blueprints are hidden in the director office.'], hasClue: true },
  { id: 204, name: 'Agent Whisper', personality: 'Informative', location: 'Control Room', dialog: ['The control systems are incredibly advanced.', 'They can operate the mecha remotely from here.', 'I overheard them mention a test scheduled for tomorrow.'], hasClue: true },
  { id: 205, name: 'Agent Phantom', personality: 'Ghostly', location: 'Underground Bunker', dialog: ['I move through the shadows unseen.', 'The real weapon is stored down here.', 'Your brother was right - this could destroy everything.'], hasClue: true },
  { id: 206, name: 'Agent Cipher', personality: 'Technical', location: 'Communications Center', dialog: ['I have been intercepting their communications.', 'They are planning to activate Mecha Pigzilla soon.', 'The activation codes are split between three scientists.'], hasClue: true },
  
  // Foundation Scientists (targets to spy on)
  { id: 207, name: 'Dr. Evil Snort', personality: 'Villainous', location: 'Research Laboratory B', dialog: ['Soon, Mecha Pigzilla will be complete!', 'No one can stop our mechanical masterpiece!', 'The world will bow before our giant pig creation!'], hasClue: true },
  { id: 208, name: 'Professor Mad Oink', personality: 'Insane', location: 'Mecha Assembly Floor', dialog: ['Look at this beautiful destruction machine!', 'Each bolt, each wire, perfectly designed for chaos!', 'The activation sequence requires all three key cards!'], hasClue: true },
  { id: 209, name: 'Director Doom Pig', personality: 'Authoritative', location: 'Director Office', dialog: ['This foundation will change the world!', 'Mecha Pigzilla is our greatest achievement!', 'Once activated, nothing can stop our mechanical beast!'], hasClue: true },
  { id: 210, name: 'Scientist Chaos', personality: 'Chaotic', location: 'Research Laboratory A', dialog: ['The power systems are beyond imagination!', 'This mecha will tower over cities!', 'I have one of the three activation key cards!'], hasClue: true },
  { id: 211, name: 'Engineer Destruction', personality: 'Destructive', location: 'Mecha Assembly Floor', dialog: ['Every weapon system is operational!', 'The mechanical pig will be unstoppable!', 'My key card controls the weapon systems!'], hasClue: true },
  { id: 212, name: 'Technician Terror', personality: 'Terrifying', location: 'Control Room', dialog: ['The neural interface is complete!', 'We can control every movement remotely!', 'I hold the final activation key card!'], hasClue: true },
  
  // Foundation Workers (additional intel sources)
  { id: 213, name: 'Guard Grunt', personality: 'Suspicious', location: 'Security Checkpoint', dialog: ['Keep moving, nothing to see here.', 'Security has been doubled lately.', 'Something big is happening in the assembly floor.'], hasClue: false },
  { id: 214, name: 'Janitor Mop', personality: 'Observant', location: 'Cafeteria', dialog: ['I clean up after these crazy scientists.', 'They work all night on that giant robot.', 'I have seen the blueprints in the trash - it is massive!'], hasClue: true },
  { id: 215, name: 'Cook Sizzle', personality: 'Gossipy', location: 'Cafeteria', dialog: ['I feed all these mad scientists.', 'They keep talking about some Pigzilla project.', 'The director ordered extra food for a big celebration.'], hasClue: false },
  { id: 216, name: 'Mechanic Wrench', personality: 'Technical', location: 'Storage Facility', dialog: ['I maintain all the equipment here.', 'They have been ordering massive mechanical parts.', 'The power requirements for their project are enormous!'], hasClue: true },
  { id: 217, name: 'Secretary Files', personality: 'Organized', location: 'Director Office', dialog: ['I keep all the director appointments.', 'There is a big meeting scheduled with military officials.', 'They are planning to demonstrate the mecha power.'], hasClue: true },
  { id: 218, name: 'Radio Operator Beep', personality: 'Connected', location: 'Communications Center', dialog: ['I handle all external communications.', 'They have been contacting weapons dealers worldwide.', 'The project codename is Operation Pigzilla.'], hasClue: false }
]

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<'menu' | 'spy'>('menu')
  const [spyLocation, setSpyLocation] = useState('Foundation Entrance')
  const [talkingToPig, setTalkingToPig] = useState<Pig | null>(null)
  const [spyCluesFound, setSpyCluesFound] = useState(0)
  const [spyCompleted, setSpyCompleted] = useState(false)

  // Chapter Menu
  if (currentChapter === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center p-4">
        <Card className="max-w-4xl w-full bg-gradient-to-br from-purple-100 to-purple-200 border-4 border-purple-400">
          <CardHeader className="text-center">
            <CardTitle className="text-5xl font-bold text-purple-800 mb-4">🐷 Pig's Adventure Chronicles</CardTitle>
            <p className="text-xl text-purple-700">Chapter 4: Spy Mission - Stop Mecha Pigzilla!</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Card className="bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800 text-center">
                    🕵️ Chapter 4: Spy Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🤖</div>
                    <p className="text-green-700 mb-4">
                      You and your brother reunite to spy on a secret foundation planning to create Mecha Pigzilla - a giant mechanical pig! Infiltrate their facilities, talk to spy pigs, and gather intelligence to stop their evil plan.
                    </p>
                    <Badge className="bg-orange-600 text-white mb-2">🆕 NEW CHAPTER</Badge>
                  </div>
                  <Button 
                    onClick={() => setCurrentChapter('spy')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                  >
                    Start Spy Mission
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Spy Chapter Logic
  if (currentChapter === 'spy') {
    const pigsAtLocation = SPY_PIGS.filter(pig => pig.location === spyLocation)

    const handleTalkToPig = (pig: Pig) => {
      setTalkingToPig(pig)
      if (pig.hasClue && !pig.dialog.includes('(Clue found!)')) {
        setSpyCluesFound(prev => {
          const newCount = prev + 1
          if (newCount >= 12) {
            setSpyCompleted(true)
          }
          return newCount
        })
        pig.dialog.push('(Clue found!)')
      }
    }

    if (spyCompleted && !talkingToPig) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-4 border-yellow-400">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-green-800 mb-4">🕵️ CHAPTER 4 COMPLETE! 🕵️</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-xl text-green-800">
                Mission accomplished! You and your brother have successfully gathered all the intelligence about the Mecha Pigzilla project. The spy pigs have the information needed to stop this mechanical menace!
              </p>
              <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
                <p className="text-green-800 font-semibold">
                  Spy Mission Complete: {spyCluesFound} intelligence clues gathered
                </p>
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={() => setCurrentChapter('menu')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                >
                  Back to Menu
                </Button>
                <p className="text-green-600 text-sm">The adventure continues...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (talkingToPig) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black p-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-400">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800 text-center">
                  🐷 Talking to {talkingToPig.name}
                </CardTitle>
                <p className="text-center text-green-600">
                  {talkingToPig.personality} • {talkingToPig.location}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {talkingToPig.dialog.map((line, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border-2 border-green-300 shadow-lg">
                    <p className="text-green-800 text-lg">"{line}"</p>
                  </div>
                ))}
                <div className="text-center">
                  <Button 
                    onClick={() => setTalkingToPig(null)}
                    className="bg-green-600 hover:bg-green-700 px-8"
                  >
                    End Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black text-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-800 to-green-900 p-4 border-b-4 border-orange-400">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-orange-300">🕵️ Chapter 4: Spy Mission - Stop Mecha Pigzilla</h1>
              <p className="text-orange-100">You and your brother must spy on the secret foundation!</p>
            </div>
            <div className="text-right">
              <div className="text-orange-300 font-semibold">
                🔍 Intel: {spyCluesFound}/12 • 📍 {spyLocation}
              </div>
              <div className="text-orange-100">
                🐷 Pigs at location: {pigsAtLocation.length}
              </div>
              <Button 
                onClick={() => setCurrentChapter('menu')}
                className="bg-purple-600 hover:bg-purple-700 text-white mt-2"
              >
                Back to Menu
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          {/* Location Navigation */}
          <Card className="mb-6 bg-gradient-to-br from-green-800 to-green-900 border-2 border-orange-400">
            <CardHeader>
              <CardTitle className="text-orange-300 text-center">🏢 Foundation Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {SPY_LOCATIONS.map(location => (
                  <Button
                    key={location}
                    onClick={() => setSpyLocation(location)}
                    variant={spyLocation === location ? "default" : "outline"}
                    className={`text-sm ${
                      spyLocation === location 
                        ? "bg-orange-600 hover:bg-orange-700 text-white" 
                        : "bg-green-700 hover:bg-green-600 text-orange-100 border-orange-400"
                    }`}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="explore" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 bg-green-800 border-2 border-orange-400">
              <TabsTrigger value="explore" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                🔍 Explore
              </TabsTrigger>
              <TabsTrigger value="pigs" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
                🐷 Talk to Pigs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="explore">
              <Card className="bg-gradient-to-br from-green-800 to-green-900 border-2 border-orange-400">
                <CardHeader>
                  <CardTitle className="text-orange-300">🏢 {spyLocation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-orange-100 text-lg">
                      You are infiltrating the {spyLocation}. This secret foundation is developing the dangerous Mecha Pigzilla project. Stay alert and gather intelligence!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-700 p-4 rounded-lg border border-orange-400">
                        <h3 className="text-orange-300 font-semibold mb-2">Mission Status:</h3>
                        <ul className="text-orange-100 space-y-1">
                          <li>• {pigsAtLocation.length} pigs at this location</li>
                          <li>• {pigsAtLocation.filter(p => p.hasClue).length} pigs with intelligence</li>
                          <li>• {pigsAtLocation.filter(p => p.personality.includes('Agent')).length} undercover spy pigs</li>
                          <li>• {pigsAtLocation.filter(p => p.personality.includes('Evil') || p.personality.includes('Villainous') || p.personality.includes('Insane')).length} enemy scientists</li>
                        </ul>
                      </div>
                      <div className="bg-green-700 p-4 rounded-lg border border-orange-400">
                        <h3 className="text-orange-300 font-semibold mb-2">Your Mission:</h3>
                        <p className="text-orange-100">
                          You and your brother have reunited to stop the Mecha Pigzilla project! Talk to spy pigs for intel and infiltrate the foundation to gather information about their evil plans. 
                          You need {12 - spyCluesFound} more intelligence clues to complete the mission!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pigs">
              <Card className="bg-gradient-to-br from-green-800 to-green-900 border-2 border-orange-400">
                <CardHeader>
                  <CardTitle className="text-orange-300">🐷 Pigs at {spyLocation}</CardTitle>
                </CardHeader>
                <CardContent>
                  {pigsAtLocation.length === 0 ? (
                    <p className="text-orange-100">No pigs are currently at this location.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pigsAtLocation.map(pig => (
                        <div key={pig.id} className="bg-green-700 p-4 rounded-lg border border-orange-400 shadow-lg">
                          <h3 className="text-orange-300 font-semibold">{pig.name}</h3>
                          <p className="text-orange-100 mb-2">Role: {pig.personality}</p>
                          <div className="flex items-center gap-2 mb-2">
                            {pig.hasClue && (
                              <Badge className="bg-yellow-600 text-white">🔍 Has Intel</Badge>
                            )}
                            {pig.personality.includes('Agent') && (
                              <Badge className="bg-blue-600 text-white">🕵️ Spy</Badge>
                            )}
                            {(pig.personality.includes('Evil') || pig.personality.includes('Villainous') || pig.personality.includes('Insane')) && (
                              <Badge className="bg-red-600 text-white">⚠️ Enemy</Badge>
                            )}
                            {pig.name === 'Your Brother' && (
                              <Badge className="bg-purple-600 text-white">👥 Brother</Badge>
                            )}
                          </div>
                          <Button 
                            onClick={() => handleTalkToPig(pig)}
                            className="bg-orange-600 hover:bg-orange-700 text-white w-full"
                          >
                            Talk to {pig.name}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return null
}