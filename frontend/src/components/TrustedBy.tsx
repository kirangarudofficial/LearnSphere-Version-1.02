import React from 'react';

export default function TrustedBy() {
  const companies = [
    { name: 'Google', logo: '/assets/logos/google.png' },
    { name: 'Microsoft', logo: '/assets/logos/microsoft.png' },
    { name: 'Amazon', logo: '/assets/logos/amazon.png' },
    { name: 'Apple', logo: '/assets/logos/apple.png' },
    { name: 'Meta', logo: '/assets/logos/meta.png' },
    { name: 'Netflix', logo: '/assets/logos/netflix.png' },
    { name: 'Tesla', logo: '/assets/logos/tesla.png' },
    { name: 'IBM', logo: '/assets/logos/ibm.png' },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Trusted by learners from leading companies worldwide
          </h2>
          <p className="text-gray-600">Join professionals from 190+ countries advancing their careers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex flex-col items-center space-y-3 group cursor-pointer p-4 rounded-xl hover:bg-white transition-all duration-300 hover:shadow-md"
            >
              <div className="h-16 w-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="max-h-12 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <span className="text-xs text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-400 to-accent-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-success-400 to-primary-500 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-secondary-400 to-accent-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-gray-700 font-semibold">12M+ learners from 190+ countries</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}