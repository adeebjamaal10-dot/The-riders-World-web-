import { HotspotPoint } from '../types';

export const anatomicalHotspots: HotspotPoint[] = [
  // SKELETAL
  {
    id: 'hs-skel-wither-dorsal',
    name: 'Thoracic Dorsal Spinous Processes (T3–T8)',
    system: 'skeletal',
    x: 42,
    y: 28,
    shortDescription: 'Tall bony spikes forming the skeletal scaffold of the withers.',
    detailedFunction: 'The dorsal spinous processes of thoracic vertebrae T3 through T8 reach heights up to 25–30 cm. They serve as the primary skeletal attachment anchor for the nuchal ligament, supraspinous ligament, and the thoracic trapezius and rhomboideus muscles.',
    saddleRelevance: 'The gullet of the saddle tree must clear these processes by at least 3–4 fingers vertically and have ample lateral width. Any direct pressure on T3–T8 causes severe periosteal inflammation and muscle atrophy.',
    relatedGuideId: 'anat-skel-02'
  },
  {
    id: 'hs-skel-lumbar-t18',
    name: 'T18 & Lumbar Spine Junction',
    system: 'skeletal',
    x: 62,
    y: 30,
    shortDescription: 'The transition from rib-bearing thoracic vertebrae to non-rib lumbar vertebrae.',
    detailedFunction: 'T18 bears the final true rib, after which the 6 lumbar vertebrae feature wide, flat transverse processes without rib cage stabilization. The longissimus dorsi transitions across this biomechanical hinge.',
    saddleRelevance: 'Weight-bearing panels must NEVER extend caudal to the 18th thoracic vertebra. Pressure on the lumbar transverse processes crushes soft kidney tissue and triggers defensive back-hollowing and bucking.',
    relatedGuideId: 'anat-skel-03'
  },
  {
    id: 'hs-skel-scapula',
    name: 'Scapula & Scapulohumeral Articulation',
    system: 'skeletal',
    x: 32,
    y: 40,
    shortDescription: 'Floating shoulder blade held purely by muscle slings without clavicle.',
    detailedFunction: 'The horse possesses no collarbone (clavicle); the entire forelimb is held to the thorax via the synsarcosis muscular sling. During full stride extension, the upper scapula rotates backwards and upwards by up to 15 degrees.',
    saddleRelevance: 'The front saddle tree points must sit at least 2–3 finger-widths behind the posterior cartilage margin of the scapula to prevent mechanical impingement during the swing phase of the forelimb.',
    relatedGuideId: 'anat-skel-05'
  },
  {
    id: 'hs-skel-pelvis-ls',
    name: 'Lumbosacral Junction & Sacrum',
    system: 'skeletal',
    x: 74,
    y: 33,
    shortDescription: 'The critical flexion hinge transferring hindquarter impulsion into the spine.',
    detailedFunction: 'The lumbosacral (LS) junction between L6 and the fused sacrum provides the primary vertical flexion/extension movement in the equine back, enabling pelvic tuck and engagement in collection.',
    saddleRelevance: 'Excessive rider weight or saddles pitched backwards jam the lumbar vertebrae, freezing the LS hinge and preventing the horse from stepping under its center of gravity.',
    relatedGuideId: 'anat-skel-04'
  },
  {
    id: 'hs-skel-cervical-c6c7',
    name: 'Cervical Spine Base (C6–C7)',
    system: 'skeletal',
    x: 28,
    y: 33,
    shortDescription: 'S-curved lower neck vertebrae articulating with the first rib.',
    detailedFunction: 'Vertebrae C6 and C7 form the bottom curve of the cervical S-bend. They house vital nerve roots of the brachial plexus powering the forelimbs and diaphragm.',
    saddleRelevance: 'High neck elevation or forward-sliding saddles can torque the lower cervical vertebrae, creating radiating nerve numbness and stumbling.',
    relatedGuideId: 'anat-skel-01'
  },
  {
    id: 'hs-skel-stifle',
    name: 'Stifle Joint (Femorotibial & Patella)',
    system: 'skeletal',
    x: 75,
    y: 56,
    shortDescription: 'Equine knee analogue with passive patellar locking mechanism.',
    detailedFunction: 'The stifle is the largest and most complex joint in the horse, featuring medial and lateral menisci and the unique patellar hook that locks the hind limb into extension during standing rest.',
    saddleRelevance: 'Restricted back motion and tight saddles restrict thoracic flexion, overloading the stifle stabilizers and causing upward fixation of the patella.',
    relatedGuideId: 'anat-skel-07'
  },
  {
    id: 'hs-skel-hock',
    name: 'Hock (Tarsus) & Reciprocal Apparatus',
    system: 'skeletal',
    x: 82,
    y: 68,
    shortDescription: 'Compound hinge joint mechanically synchronized with the stifle.',
    detailedFunction: 'Comprising six small tarsal bones, the hock moves in unison with the stifle via the reciprocal apparatus (peroneus tertius and superficial digital flexor tendons).',
    saddleRelevance: 'Uneven rider balance shifts shearing forces into the small tarsal joints, accelerating bone spavin (osteoarthritis of the distal tarsus).',
    relatedGuideId: 'anat-skel-08'
  },

  // MUSCULAR
  {
    id: 'hs-musc-trapezius',
    name: 'Trapezius (Thoracic & Cervical Parts)',
    system: 'muscular',
    x: 36,
    y: 31,
    shortDescription: 'Fan-shaped flat muscle elevating the shoulder and drawing the scapula forward.',
    detailedFunction: 'The thoracic part of the trapezius originates along the supraspinous ligament from T1 to T10 and inserts onto the spine of the scapula. It is crucial for elevating the shoulder.',
    saddleRelevance: 'This is the first muscle to undergo ischemic atrophy when a saddle tree is too narrow or when pinched by a tight gullet, leaving hollow "depressions" behind the wither.',
    relatedGuideId: 'anat-musc-01'
  },
  {
    id: 'hs-musc-longissimus',
    name: 'Longissimus Dorsi (Spinal Column)',
    system: 'muscular',
    x: 52,
    y: 32,
    shortDescription: 'The longest, most powerful extensor muscle running along the ribs and spine.',
    detailedFunction: 'Originating on the ilium and sacrum and inserting into thoracic and cervical vertebrae, this massive muscle stabilizes the trunk and extends the back.',
    saddleRelevance: 'The saddle panels are designed to rest upon the rib cage supported by the longissimus dorsi, distributing weight over its broad surface without bridging or focal pressure points.',
    relatedGuideId: 'anat-musc-02'
  },
  {
    id: 'hs-musc-gluteal',
    name: 'Middle Gluteal Muscle (Musculus Gluteus Medius)',
    system: 'muscular',
    x: 72,
    y: 35,
    shortDescription: 'The primary powerhouse muscle of hip extension and propulsion.',
    detailedFunction: 'Covering the entire croup, the middle gluteal originates from the ilium and lumbar aponeurosis, inserting into the major trochanter of the femur to propel the horse forward.',
    saddleRelevance: 'When the saddle tree does not allow the ribcage to swing laterally, the gluteals compensate with asymmetric tension, causing uneven propulsion and gait irregularities.',
    relatedGuideId: 'anat-musc-05'
  },
  {
    id: 'hs-musc-abdominals',
    name: 'Abdominal Slings & Rectus Abdominis',
    system: 'muscular',
    x: 54,
    y: 60,
    shortDescription: 'The ventral muscular tension band holding up the viscera and arching the back.',
    detailedFunction: 'The rectus abdominis runs from the sternum to the pubis. Its contraction tilts the pelvis forward, flattens the lumbar curve, and elevates the back to carry rider weight.',
    saddleRelevance: 'If a saddle pinches the withers or bridges along the spine, the horse reflexively tightens the dorsal muscles and relaxes the abdominals, leading to a dropped, hollow back.',
    relatedGuideId: 'anat-musc-04'
  },
  {
    id: 'hs-musc-splenius',
    name: 'Splenius & Brachiocephalic Muscles',
    system: 'muscular',
    x: 23,
    y: 24,
    shortDescription: 'Upper neck musculature responsible for crest arching and head balance.',
    detailedFunction: 'The splenius elevates and inclines the head and neck. Working in synergy with the brachiocephalicus, it provides dynamic counterbalance during gait transitions.',
    saddleRelevance: 'A horse with back discomfort cannot freely reach forward and down into the bit, creating hypertrophy in the lower neck muscles (ewe-neck) and tension in the poll.',
    relatedGuideId: 'anat-musc-06'
  },

  // CONFORMATION
  {
    id: 'hs-conf-withers',
    name: 'Wither Conformation & Slope',
    system: 'conformation',
    x: 41,
    y: 29,
    shortDescription: 'Wither height, width, and backward transition into the dorsal spine.',
    detailedFunction: 'Well-defined, backward-sloping withers provide an optimal foundation for saddle placement and allow deep muscular attachment for the neck suspensory mechanism.',
    saddleRelevance: 'High, mutton, or shark-fin withers require fundamentally different tree geometries, gullet heights, and pommel flare to avoid bone trauma and rolling.',
    relatedGuideId: 'anat-conf-02'
  },
  {
    id: 'hs-conf-shoulder-angle',
    name: 'Shoulder Angle (Scapular Incline)',
    system: 'conformation',
    x: 32,
    y: 43,
    shortDescription: 'The 45° to 50° angle between scapula and horizontal ground line.',
    detailedFunction: 'An obliquely sloped shoulder allows wide stride extension and natural shock absorption through the elastic muscular sling. An upright shoulder produces a jarring, short step.',
    saddleRelevance: 'Oblique shoulders sweep further back during movement, requiring forward-cut saddles or cut-back head designs to prevent the tree points from bumping the cartilage.',
    relatedGuideId: 'anat-conf-03'
  },
  {
    id: 'hs-conf-back-coupling',
    name: 'Back Length & Lumbar Coupling',
    system: 'conformation',
    x: 56,
    y: 31,
    shortDescription: 'The ratio between back length and the width of the lumbar coupling.',
    detailedFunction: 'A short, tightly coupled loin transfers thrust with great efficiency, whereas a long back provides flexibility but is structurally more prone to sagging under weight.',
    saddleRelevance: 'Short-backed breeds (e.g. Arabians, Andalusians) require compact saddle panels with upswept rear gussets to avoid impinging upon the lumbar spine.',
    relatedGuideId: 'anat-conf-04'
  },
  {
    id: 'hs-conf-croup',
    name: 'Croup Angle & Tailhead Set',
    system: 'conformation',
    x: 77,
    y: 36,
    shortDescription: 'Slope from tuber coxae to tuber ischii (flat, sloping, or goose-rumped).',
    detailedFunction: 'Baroque and working breeds possess sloped croups tailored for collection and explosive low-speed power. Flat croups are typical of speed-bred racehorses.',
    saddleRelevance: 'A steep croup can cause saddles to slide forward onto the withers during downhill riding or collected work if not countered by appropriate balance flocking.',
    relatedGuideId: 'anat-conf-05'
  },

  // SADDLE
  {
    id: 'hs-sad-gullet-channel',
    name: 'Gullet Channel & Spinal Clearance',
    system: 'saddle',
    x: 48,
    y: 30,
    shortDescription: 'Continuous central tunnel between left and right wool flock panels.',
    detailedFunction: 'Provides unrestricted vertical and lateral clearance for the dorsal spinous processes and the supraspinous ligament throughout flexion and lateral bend.',
    saddleRelevance: 'The gullet channel must measure at least 3.5 to 4.5 inches (4 fingers) along its entire length to avoid resting on the spinal ligament during axial rotation.',
    relatedGuideId: 'anat-inter-02'
  },
  {
    id: 'hs-sad-tree-points',
    name: 'Tree Points & Head Angle',
    system: 'saddle',
    x: 37,
    y: 34,
    shortDescription: 'The downward-extending wooden or polymer prongs flanking the pommel.',
    detailedFunction: 'Dictates the width and angle of the saddle head to match the horse’s cranial thoracic contour.',
    saddleRelevance: 'Tree points must lie parallel to the shoulder angle. If too narrow, the points stab into the muscle; if too wide, the pommel drops onto the withers.',
    relatedGuideId: 'anat-inter-03'
  },
  {
    id: 'hs-sad-bearing-zone',
    name: 'Thoracic Weight-Bearing Zone',
    system: 'saddle',
    x: 50,
    y: 33,
    shortDescription: 'The anatomically safe surface area supported by the rib cage (T5 to T18).',
    detailedFunction: 'The only region of the equine back anatomically designed to carry static and dynamic vertical weight without mechanical distortion of the spinal column.',
    saddleRelevance: 'Pressure must be distributed evenly across this zone. Pressure spikes exceeding 25 kPa cause capillary occlusion and subcutaneous tissue necrosis.',
    relatedGuideId: 'anat-inter-01'
  },
  {
    id: 'hs-sad-girth-line',
    name: 'Girth Line & Sternal Alignment',
    system: 'saddle',
    x: 40,
    y: 65,
    shortDescription: 'The natural sternal groove behind the horse’s elbows.',
    detailedFunction: 'The narrowest circumference of the girth groove where gravity and thoracic taper naturally draw the girth.',
    saddleRelevance: 'If the girth groove is located far forward under the elbows, a straight girth will pull the saddle forward onto the scapula. An anatomical curved or crescent girth is required.',
    relatedGuideId: 'anat-inter-04'
  },

  // SHOULDER
  {
    id: 'hs-shld-cartilage',
    name: 'Scapular Cartilage Margin',
    system: 'shoulder',
    x: 34,
    y: 29,
    shortDescription: 'The flexible dorsal rim of cartilage crowning the top of the scapula.',
    detailedFunction: 'Extends the surface area of the shoulder blade without adding brittle bone weight, providing flexible attachment for the rhomboideus muscle.',
    saddleRelevance: 'During upward rotation of the forelimb, this cartilage glides underneath the front edge of the saddle. Saddles with flexible panel tops prevent traumatic bruising.',
    relatedGuideId: 'anat-inter-06'
  },
  {
    id: 'hs-shld-tree-clearance',
    name: 'Tree Point Scapular Clearance Zone',
    system: 'shoulder',
    x: 35,
    y: 37,
    shortDescription: 'The 2–3 finger-width safety margin between bone edge and saddle tree.',
    detailedFunction: 'Allows unobstructed backward sweep of the scapular blade as the leg enters the retraction phase.',
    saddleRelevance: 'Rigid tree points placed directly over the bone halt the stride early, causing short, choppy movement and stumbling.',
    relatedGuideId: 'anat-inter-03'
  },
  {
    id: 'hs-shld-rhomboideus',
    name: 'Rhomboideus & Subscapular Padding',
    system: 'shoulder',
    x: 31,
    y: 27,
    shortDescription: 'Deep muscle cushion anchoring the shoulder blade to the cervical spine.',
    detailedFunction: 'Draws the shoulder blade forward and up, acting as a suspension spring against concussive footfall.',
    saddleRelevance: 'Healthy development of this muscle depends entirely on freedom from pinching during ridden work.',
    relatedGuideId: 'anat-musc-01'
  }
];
