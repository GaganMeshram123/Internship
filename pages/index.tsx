import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ThemeToggle from "@/lib/ThemeToggle";
import { useThemeContext } from "@/lib/ThemeContext";

// Import all modules dynamically
const getModules = async () => {
  const modules = [];
  const moduleNames = [
    'ap-physics-1-kinematics1D',
    'balancing-chemical-equations',
    'circle-theorems-0001',
    'circular-motion-0001',
    'current-electricity-0001',
    'electrostatics-0001',
    'fluids-0001',
    'force-dynamics-0001',
    'force-dynamics-0002',
    'genetics-xi-bio',
    'gravitation-0001',
    'ib-10-chem-mole-concept',
    'ib-10-physics-fields',
    'ib-9-physics-motion',
    'ib-dp-chem-mole-concept',
    'ib-dp-physics-forces-and-momentum',
    'icse-mensuration-10',
    'kinematics-0001',
    'linear-momentum-0001',
    'machine-learning-0001',
    'math-functions',
    'modulus-function',
    'number-theory-0001',
    'olympiad-8-chem-mole-concept',
    'oscillations-0001',
    'python-kids-0001',
    'python-kids-0002',
    'python-kids-0003',
    'python-kids-0004',
    'python-kids-0005',
    'python-kids-0006',
    'quadratic-equations-0001',
    'rotational-motion-0001',
    'sequences',
    'spring-forces-0001',
    'trigonometry-basics',
    'vectors',
    'irrational-number',
    'Intuitive-trigonometry',
    'arithmetic',
    'work-energy-power-0001',
    'grade-2-math-geometry',
    'Linear-equations-and-functions',
    ' Solving-equations-with-one-unknown',
    'grade-2-math-operations',
    'Motion',
    'Force_Laws_of_Motion',
    'Adaptations',
    'Performing transformations',
    'olympiad-8-bio-nervous-system'
  ];

  for (const moduleName of moduleNames) {
    try {
      const module = await import(`./modules/${moduleName}/index.tsx`);
      modules.push({
        name: moduleName,
        displayName: moduleName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        component: module.default,
        hasSubmodules: true
      });
    } catch (error) {
      console.warn(`Could not load module: ${moduleName}`, error);
    }
  }

  return modules;
};

export default function Home() {
  const router = useRouter();
  const { isDarkMode } = useThemeContext();
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<any>(null);

  useEffect(() => {
    const loadModules = async () => {
      try {
        const moduleList = await getModules();
        setModules(moduleList);
      } catch (error) {
        console.error('Error loading modules:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, []);

  const handleModuleClick = (module: any) => {
    setSelectedModule(module);
    router.push(`/concept?module=${module.name}`);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Quazar Module Tester</title>
        <meta name="description" content="Test all Quazar modules" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="bg-white dark:bg-gray-900" style={{ minHeight: '100vh', width: '100%' }}>
        <main style={{ minHeight: '100vh', width: '100%', position: 'relative' }}>
          {/* Header */}
          <div className="sticky top-0 left-0 right-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-300">
                    Quazar Module Tester
                  </h1>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Test modules without authentication
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Available Modules
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click on any module to test it. Found {modules.length} modules.
                  </p>
                </div>
                
                {/* Module Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {modules.map((module) => (
                    <div
                      key={module.name}
                      onClick={() => handleModuleClick(module)}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:border-indigo-300 dark:hover:border-indigo-600"
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                              <span className="text-indigo-600 dark:text-indigo-300 font-semibold text-lg">
                                {module.displayName.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-3 text-right">
                            <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              Module
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
                            {module.displayName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Interactive learning module
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {module.hasSubmodules ? 'Has Submodules' : 'Single Module'}
                          </div>
                          <div className="flex items-center text-indigo-600 dark:text-indigo-300">
                            <span className="text-sm font-medium">Test →</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {modules.length === 0 && (
                  <div className="text-center py-20">
                    <div className="text-gray-500 dark:text-gray-400">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="text-xl font-medium mb-2">No modules found</h3>
                      <p>Make sure the modules directory contains valid module files.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}