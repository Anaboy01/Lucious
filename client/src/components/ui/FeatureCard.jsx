const FeatureCard = ({feature, index = 0}) => {
 return (
    <div className="text-center animate-fadeInUp" style={{ animationDelay: `${3 + index * 0.1}s` }}>
      <div
        className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
      >
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
      <p className="text-gray-600">{feature.desc}</p>
    </div>
  )
}

export default FeatureCard