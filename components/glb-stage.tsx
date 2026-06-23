"use client";

import { useEffect, useRef, useState } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Box3,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type GlbStageProps = {
  src: string;
  pose: {
    zoom: number;
    scale: number;
    rotateX: number;
    rotateY: number;
    rotateZ: number;
    screenX: number;
    screenY: number;
    screenScale: number;
    screenRotate: number;
  };
};

export function GlbStage({ src, pose }: GlbStageProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const rootRef = useRef<Group | null>(null);
  const modelRef = useRef<Group | null>(null);

  const renderScene = () => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const root = rootRef.current;
    if (!scene || !camera || !renderer || !root) return;

    const model = modelRef.current;
    root.rotation.set(pose.rotateX, pose.rotateY, pose.rotateZ);
    root.scale.setScalar(pose.scale);

    if (model) {
      model.rotation.y = pose.rotateY * 0.25;
      model.rotation.x = pose.rotateX * 0.2;
      model.rotation.z = pose.rotateZ * 0.4;
    }

    camera.position.set(0, 0, pose.zoom);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let destroyed = false;

    const scene = new Scene();
    scene.background = null;
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, pose.zoom);
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight, false);
    mount.appendChild(renderer.domElement);

    const root = new Group();
    root.rotation.x = pose.rotateX;
    root.rotation.y = pose.rotateY;
    root.rotation.z = pose.rotateZ;
    root.scale.setScalar(pose.scale);
    rootRef.current = root;
    scene.add(root);

    const ambient = new AmbientLight(0xffffff, 1.6);
    scene.add(ambient);

    const key = new DirectionalLight(0xffffff, 2.8);
    key.position.set(4, 6, 8);
    scene.add(key);

    const rim = new DirectionalLight(0xbfd7ff, 1.2);
    rim.position.set(-6, 2, -4);
    scene.add(rim);

    const loader = new GLTFLoader();

    const fitModel = (group: Group) => {
      const box = new Box3().setFromObject(group);
      const size = new Vector3();
      const center = new Vector3();
      box.getSize(size);
      box.getCenter(center);

      group.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = 2.5 / maxDim;
      group.scale.setScalar(scale);
    };

    loader.load(
      src,
      (gltf) => {
        if (destroyed) return;

        modelRef.current = gltf.scene;
        gltf.scene.traverse((child) => {
          if (child instanceof Mesh) {
            const materials = Array.isArray(child.material)
              ? child.material
              : [child.material];

            materials.forEach((material) => {
              if (material instanceof MeshStandardMaterial) {
                material.metalness = 0.55;
                material.roughness = 0.28;
              }
            });
          }
        });

        fitModel(gltf.scene);
        root.add(gltf.scene);
        renderScene();
      },
      undefined,
      () => {
        if (!destroyed) {
          setFailed(true);
        }
      },
    );

    const resize = () => {
      const currentMount = mountRef.current;
      if (!currentMount) return;
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderScene();
    };

    const observe = new ResizeObserver(resize);
    observe.observe(mount);

    resize();
    renderScene();

    return () => {
      destroyed = true;
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      rootRef.current = null;
      modelRef.current = null;
      observe.disconnect();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [src]);

  useEffect(() => {
    renderScene();
  }, [pose, renderScene]);

  return (
    <div
      className="model-stage"
      ref={mountRef}
      style={{
        transform: `translate3d(${pose.screenX}vw, ${pose.screenY}vh, 0) scale(${pose.screenScale}) rotate(${pose.screenRotate}deg)`,
      }}
    >
      {failed ? (
        <div className="model-fallback">
          <span>3D preview unavailable</span>
          <strong>{src.split("/").pop()}</strong>
        </div>
      ) : null}
    </div>
  );
}
