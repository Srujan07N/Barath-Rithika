import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Procedurally generates high-resolution Wood Carving Texture with
 * traditional Kerala / South Indian floral relief & brass studs
 */
function createDoorTexture(isRight = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Base rich dark teak / rosewood gradient
  const woodGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  woodGrad.addColorStop(0, '#2A1812');
  woodGrad.addColorStop(0.3, '#3B231A');
  woodGrad.addColorStop(0.5, '#4E2E22');
  woodGrad.addColorStop(0.8, '#3A2118');
  woodGrad.addColorStop(1, '#23140E');
  ctx.fillStyle = woodGrad;
  ctx.fillRect(0, 0, 1024, 2048);

  // Subtle wood grain lines
  ctx.fillStyle = 'rgba(20, 10, 6, 0.15)';
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 1024;
    const w = Math.random() * 8 + 2;
    ctx.fillRect(x, 0, w, 2048);
  }

  // Outer carved border with gold inlay
  ctx.strokeStyle = '#D6B77A';
  ctx.lineWidth = 14;
  ctx.strokeRect(30, 30, 964, 1988);

  ctx.strokeStyle = '#8B5A2B';
  ctx.lineWidth = 6;
  ctx.strokeRect(48, 48, 928, 1952);

  // Four Carved Relief Panels on each door leaf
  const panelHeight = 420;
  const panelYPositions = [80, 540, 1000, 1460];

  panelYPositions.forEach((py) => {
    // Panel background
    ctx.fillStyle = '#26150E';
    ctx.fillRect(80, py, 864, panelHeight);

    // Bevel effect
    ctx.strokeStyle = '#623B2A';
    ctx.lineWidth = 12;
    ctx.strokeRect(80, py, 864, panelHeight);

    ctx.strokeStyle = '#D6B77A';
    ctx.lineWidth = 3;
    ctx.strokeRect(96, py + 16, 832, panelHeight - 32);

    // Carved center lotus medallion
    const cx = 512;
    const cy = py + panelHeight / 2;

    ctx.save();
    ctx.translate(cx, cy);

    // Outer mandala circle
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 110, 0, Math.PI * 2);
    ctx.stroke();

    // 12 carved floral petals
    for (let p = 0; p < 12; p++) {
      ctx.rotate((Math.PI * 2) / 12);
      ctx.fillStyle = '#8C5E35';
      ctx.beginPath();
      ctx.ellipse(0, -65, 18, 45, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden vein
      ctx.strokeStyle = '#D6B77A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(0, -95);
      ctx.stroke();
    }

    // Medallion center
    ctx.fillStyle = '#D6B77A';
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#781F35';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Corner flourishes
    const corners = [
      [110, py + 30],
      [890, py + 30],
      [110, py + panelHeight - 30],
      [890, py + panelHeight - 30],
    ];
    corners.forEach(([cornerX, cornerY]) => {
      ctx.fillStyle = '#D6B77A';
      ctx.beginPath();
      ctx.arc(cornerX, cornerY, 8, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  // Brass studs (kumil) along the edges
  ctx.fillStyle = '#E5C07B';
  const studSpacing = 120;
  for (let y = 100; y < 2000; y += studSpacing) {
    ctx.beginPath();
    ctx.arc(isRight ? 60 : 964, y, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFF8EF';
    ctx.beginPath();
    ctx.arc(isRight ? 56 : 960, y - 4, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#E5C07B';
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

/**
 * Procedural Bump Map for Wood & Floral Carvings
 */
function createDoorBumpMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 1024);

  // Recessed panels
  const panelHeight = 210;
  [40, 270, 500, 730].forEach((py) => {
    ctx.fillStyle = '#505050'; // recessed
    ctx.fillRect(40, py, 432, panelHeight);

    ctx.fillStyle = '#B0B0B0'; // bevel edge
    ctx.strokeRect(40, py, 432, panelHeight);

    // Embossed center
    ctx.fillStyle = '#D0D0D0';
    ctx.beginPath();
    ctx.arc(256, py + panelHeight / 2, 45, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export const ThreeDDoor = ({ isOpen, onOpened }) => {
  const mountRef = useRef(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const stateRef = useRef({
    isOpen: false,
    leftPivot: null,
    rightPivot: null,
    camera: null,
    interiorLight: null,
    particles: null,
    renderer: null,
    animationProgress: 0,
    hasTriggeredComplete: false,
  });

  // Track prop changes
  useEffect(() => {
    stateRef.current.isOpen = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch (e) {
      setWebGLSupported(false);
      return;
    }

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x190F0B); // Deep royal heritage ambience

    const aspect = width / height;
    const baseZ = aspect < 1 ? Math.min(8.5, 5.0 / Math.max(aspect * 0.95, 0.55)) : 5.0;

    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0.1, baseZ);
    stateRef.current.camera = camera;
    stateRef.current.baseZ = baseZ;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // LIGHTING
    // Ambient warm glow
    const ambientLight = new THREE.AmbientLight(0xfff3e0, 0.7);
    scene.add(ambientLight);

    // Warm directional light (key light from front-top)
    const frontLight = new THREE.DirectionalLight(0xffecd2, 1.2);
    frontLight.position.set(2, 4, 5);
    frontLight.castShadow = true;
    frontLight.shadow.mapSize.width = 1024;
    frontLight.shadow.mapSize.height = 1024;
    scene.add(frontLight);

    // Diya warm point lights on the sides
    const leftDiya = new THREE.PointLight(0xff9900, 1.8, 6);
    leftDiya.position.set(-2.0, -0.6, 1.0);
    scene.add(leftDiya);

    const rightDiya = new THREE.PointLight(0xff9900, 1.8, 6);
    rightDiya.position.set(2.0, -0.6, 1.0);
    scene.add(rightDiya);

    // Interior Divine Golden Glow (emerges when doors open)
    const interiorLight = new THREE.SpotLight(0xffdf80, 0.1, 25, Math.PI / 2.8, 0.4, 1.2);
    interiorLight.position.set(0, 0.5, -2.5);
    interiorLight.target.position.set(0, 0, 2);
    scene.add(interiorLight);
    scene.add(interiorLight.target);
    stateRef.current.interiorLight = interiorLight;

    // DOOR GEOMETRY & MATERIALS
    const doorWidth = 1.48;
    const doorHeight = 4.0;
    const doorThickness = 0.09;

    const leftTexture = createDoorTexture(false);
    const rightTexture = createDoorTexture(true);
    const bumpTexture = createDoorBumpMap();

    const createDoorMaterial = (tex) =>
      new THREE.MeshStandardMaterial({
        map: tex,
        bumpMap: bumpTexture,
        bumpScale: 0.035,
        roughness: 0.45,
        metalness: 0.12,
      });

    const leftMat = createDoorMaterial(leftTexture);
    const rightMat = createDoorMaterial(rightTexture);

    const doorGeo = new THREE.BoxGeometry(doorWidth, doorHeight, doorThickness);

    // LEFT DOOR & HINGE PIVOT
    // Pivot at x = -doorWidth
    const leftPivot = new THREE.Group();
    leftPivot.position.set(-doorWidth, 0, 0);
    scene.add(leftPivot);

    const leftDoorMesh = new THREE.Mesh(doorGeo, leftMat);
    leftDoorMesh.position.set(doorWidth / 2, 0, 0); // Offset mesh so pivot is at hinge
    leftDoorMesh.castShadow = true;
    leftDoorMesh.receiveShadow = true;
    leftPivot.add(leftDoorMesh);
    stateRef.current.leftPivot = leftPivot;

    // RIGHT DOOR & HINGE PIVOT
    // Pivot at x = +doorWidth
    const rightPivot = new THREE.Group();
    rightPivot.position.set(doorWidth, 0, 0);
    scene.add(rightPivot);

    const rightDoorMesh = new THREE.Mesh(doorGeo, rightMat);
    rightDoorMesh.position.set(-doorWidth / 2, 0, 0); // Offset mesh so pivot is at hinge
    rightDoorMesh.castShadow = true;
    rightDoorMesh.receiveShadow = true;
    rightPivot.add(rightDoorMesh);
    stateRef.current.rightPivot = rightPivot;

    // ANTIQUE GOLD HANDLES (Lion / Ornate Brass Ring Handle)
    const handleMat = new THREE.MeshStandardMaterial({
      color: 0xd6b77a,
      metalness: 0.88,
      roughness: 0.22,
    });

    const createHandle = () => {
      const handleGroup = new THREE.Group();
      // Mount plate
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.03, 16), handleMat);
      plate.rotation.x = Math.PI / 2;
      handleGroup.add(plate);

      // Antique Ring
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 16, 32), handleMat);
      ring.position.set(0, -0.06, 0.04);
      ring.castShadow = true;
      handleGroup.add(ring);

      return handleGroup;
    };

    // Attach handle to Left Door (near right edge)
    const leftHandle = createHandle();
    leftHandle.position.set(doorWidth - 0.16, -0.05, doorThickness / 2 + 0.02);
    leftPivot.add(leftHandle);

    // Attach handle to Right Door (near left edge)
    const rightHandle = createHandle();
    rightHandle.position.set(-doorWidth + 0.16, -0.05, doorThickness / 2 + 0.02);
    rightPivot.add(rightHandle);

    // ARCHWAY & FRAME
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x22130c,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Top Beam
    const topBeam = new THREE.Mesh(new THREE.BoxGeometry(doorWidth * 2 + 0.5, 0.28, 0.28), frameMat);
    topBeam.position.set(0, doorHeight / 2 + 0.14, 0.04);
    scene.add(topBeam);

    // Left Pillar Frame
    const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.24, doorHeight + 0.28, 0.26), frameMat);
    leftPillar.position.set(-doorWidth - 0.12, 0, 0.04);
    scene.add(leftPillar);

    // Right Pillar Frame
    const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.24, doorHeight + 0.28, 0.26), frameMat);
    rightPillar.position.set(doorWidth + 0.12, 0, 0.04);
    scene.add(rightPillar);

    // HANGING JASMINE GARLANDS (Mullappoo Mala on archway & pillars)
    const jasmineGarlandMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.7,
      metalness: 0.05,
    });
    const marigoldMat = new THREE.MeshStandardMaterial({
      color: 0xff8c00,
      roughness: 0.8,
    });

    const createGarland = (length, count, radius = 0.035) => {
      const gGroup = new THREE.Group();
      for (let i = 0; i < count; i++) {
        const mat = i % 4 === 0 ? marigoldMat : jasmineGarlandMat;
        const bead = new THREE.Mesh(new THREE.SphereGeometry(radius, 8, 8), mat);
        bead.position.y = -(i * (length / count));
        bead.position.x = Math.sin(i * 0.5) * 0.015;
        gGroup.add(bead);
      }
      return gGroup;
    };

    const leftGarland = createGarland(3.6, 42, 0.032);
    leftGarland.position.set(-doorWidth - 0.02, doorHeight / 2 - 0.05, 0.16);
    scene.add(leftGarland);

    const rightGarland = createGarland(3.6, 42, 0.032);
    rightGarland.position.set(doorWidth + 0.02, doorHeight / 2 - 0.05, 0.16);
    scene.add(rightGarland);

    // SWAGGED TOP ARCH GARLAND (Curved Toran)
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-doorWidth - 0.1, doorHeight / 2 + 0.02, 0.18),
      new THREE.Vector3(0, doorHeight / 2 - 0.35, 0.2),
      new THREE.Vector3(doorWidth + 0.1, doorHeight / 2 + 0.02, 0.18)
    );
    const curvePoints = curve.getPoints(36);
    curvePoints.forEach((pt, i) => {
      const mat = i % 3 === 0 ? marigoldMat : jasmineGarlandMat;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), mat);
      bead.position.copy(pt);
      scene.add(bead);
    });

    // FLOATING GOLDEN PARTICLES
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 6;
      particlePositions[i + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    stateRef.current.particles = particles;

    // MOUSE PARALLAX
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      if (stateRef.current.isOpen) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // RESIZE HANDLER
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      const newAspect = width / height;
      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      stateRef.current.baseZ = newAspect < 1 ? Math.min(8.5, 5.0 / Math.max(newAspect * 0.95, 0.55)) : 5.0;
      if (!stateRef.current.isOpen) {
        camera.position.z = stateRef.current.baseZ;
      }
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let reqId;
    let clock = new THREE.Clock();

    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Flicker Diya point lights
      leftDiya.intensity = 1.8 + Math.sin(time * 8.0) * 0.2 + Math.cos(time * 12.0) * 0.15;
      rightDiya.intensity = 1.8 + Math.cos(time * 7.5) * 0.2 + Math.sin(time * 11.0) * 0.15;

      // Gentle garland sway
      leftGarland.rotation.z = Math.sin(time * 1.5) * 0.02;
      rightGarland.rotation.z = -Math.sin(time * 1.5 + 0.4) * 0.02;

      // Particle floating drift
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += delta * 0.15;
        if (positions[i] > 3) positions[i] = -2.5;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // DOOR OPENING LOGIC
      if (stateRef.current.isOpen) {
        // Smoothly interpolate progress from 0 to 1
        stateRef.current.animationProgress = Math.min(
          1,
          stateRef.current.animationProgress + delta * 0.52 // ~2 seconds opening
        );
        const p = stateRef.current.animationProgress;

        // Smooth cubic ease out
        const ease = 1 - Math.pow(1 - p, 3);

        // Rotate Doors Outward:
        // Left door swings outward (negative Y rotation up to -115 deg)
        leftPivot.rotation.y = -ease * (Math.PI * 0.65);
        // Right door swings outward (positive Y rotation up to +115 deg)
        rightPivot.rotation.y = ease * (Math.PI * 0.65);

        // Camera dollys forward into the doorway
        const initialZ = stateRef.current.baseZ || 5.0;
        camera.position.z = initialZ - ease * (initialZ - 2.4);
        camera.position.y = 0.1 + ease * 0.15;
        camera.lookAt(0, 0, 0);

        // Surge interior divine golden light
        interiorLight.intensity = THREE.MathUtils.lerp(0.1, 7.5, ease);

        // Notify parent when doors have opened enough to reveal invitation
        if (p > 0.85 && !stateRef.current.hasTriggeredComplete) {
          stateRef.current.hasTriggeredComplete = true;
          if (onOpened) onOpened();
        }
      } else {
        // Idle mouse parallax
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY + 0.1 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onOpened]);

  // CSS 3D Fallback if WebGL unavailable
  if (!webGLSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#20130E] overflow-hidden perspective-1200">
        <div className="relative w-[340px] sm:w-[460px] h-[580px] sm:h-[680px] flex preserve-3d shadow-2xl border-8 border-[#3A2218] rounded-t-2xl">
          {/* Left Door */}
          <div
            className={`w-1/2 h-full bg-[#3B231A] border-r-2 border-[#D6B77A] flex flex-col justify-around p-4 origin-left transition-transform duration-1000 ease-in-out ${
              isOpen ? '-rotate-y-110 -translate-z-20' : ''
            }`}
            style={{
              transform: isOpen ? 'rotateY(-110deg)' : 'rotateY(0deg)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
            }}
          >
            <div className="h-28 border border-[#D6B77A] rounded flex items-center justify-center text-gold">✦</div>
            <div className="h-28 border border-[#D6B77A] rounded flex items-center justify-center text-gold">✦</div>
            <div className="h-28 border border-[#D6B77A] rounded flex items-center justify-center text-gold">✦</div>
          </div>
          {/* Right Door */}
          <div
            className={`w-1/2 h-full bg-[#3B231A] border-l-2 border-[#D6B77A] flex flex-col justify-around p-4 origin-right transition-transform duration-1000 ease-in-out ${
              isOpen ? 'rotate-y-110 -translate-z-20' : ''
            }`}
            style={{
              transform: isOpen ? 'rotateY(110deg)' : 'rotateY(0deg)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
            }}
          >
            <div className="h-28 border border-[#D6B77A] rounded flex items-center justify-center text-gold">✦</div>
            <div className="h-28 border border-[#D6B77A] rounded flex items-center justify-center text-gold">✦</div>
            <div className="h-28 border border-[#D6B77A] rounded flex items-center justify-center text-gold">✦</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
    />
  );
};

export default ThreeDDoor;
