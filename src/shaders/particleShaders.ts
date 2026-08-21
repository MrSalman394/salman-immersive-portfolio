export const particleVertexShader = `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  
  attribute float aScale;
  attribute float aPhase;
  
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistance;

  void main() {
    vec3 pos = position;
    
    // Multi-frequency cosmic orbital swirling
    float angle = uTime * 0.12 + aPhase + (pos.z * 0.02);
    float cosA = cos(angle);
    float sinA = sin(angle);
    
    // Fluid vortex rotation
    vec2 rotatedXY = vec2(
      pos.x * cosA - pos.y * sinA,
      pos.x * sinA + pos.y * cosA
    );
    pos.xy = rotatedXY;
    
    // Wave oscillation along Z axis
    pos.z += sin(uTime * 0.6 + aPhase * 2.0) * 1.8;
    
    // Interactive mouse gravitation & repulsion warp
    vec2 mouseEffect = (uPointer * 8.0) - pos.xy;
    float dist = length(mouseEffect);
    if (dist < 7.0) {
      float force = (7.0 - dist) / 7.0;
      pos.xy -= normalize(mouseEffect) * force * 1.8;
      pos.z += force * 2.5;
    }
    
    // Scroll depth propulsion
    pos.z += uScroll * 12.0;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Perspective particle size with velocity boost
    gl_PointSize = (aScale * (14.0 / -mvPosition.z)) * (1.0 + sin(uTime * 2.0 + aPhase) * 0.3);
    
    // Dynamic color grading: electric cyan, solar gold, celestial violet, photon white
    vec3 cCyan = vec3(0.22, 0.75, 0.98);
    vec3 cGold = vec3(0.98, 0.75, 0.14);
    vec3 cViolet = vec3(0.68, 0.35, 0.98);
    vec3 cWhite = vec3(0.95, 0.98, 1.0);
    
    float colorMix = sin(pos.z * 0.08 + uTime * 0.3 + aPhase) * 0.5 + 0.5;
    if (colorMix < 0.4) {
      vColor = mix(cCyan, cGold, colorMix / 0.4);
    } else if (colorMix < 0.75) {
      vColor = mix(cGold, cViolet, (colorMix - 0.4) / 0.35);
    } else {
      vColor = mix(cViolet, cWhite, (colorMix - 0.75) / 0.25);
    }
    
    vAlpha = clamp(18.0 / -mvPosition.z, 0.15, 0.9);
    vDistance = -mvPosition.z;
  }
`;

export const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistance;

  void main() {
    // Sharp radial soft-glow circular point
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    
    if (dist > 0.5) discard;
    
    // Glowing photon core with soft radiant falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = 1.0 - smoothstep(0.0, 0.15, dist);
    
    vec3 finalColor = vColor + vec3(core * 0.5);
    float alpha = glow * vAlpha;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;
