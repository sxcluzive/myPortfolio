import React from 'react';

export default function DatabaseYaml() {
  return (
    <div className="bg-terminal-bg border border-terminal-border rounded-lg p-6 font-mono text-sm">
      <div className="text-green-400 mb-4">
        <i className="fas fa-database mr-2"></i>
        Database & Cloud Infrastructure
        <span className="text-muted-foreground ml-2">6 Technologies</span>
      </div>
      
      <div className="text-xs space-y-1">
        <div className="text-green-400"># Database & Cloud Stack Configuration</div>
        <div className="text-green-400">version: '3.8'</div>
        <div className="text-green-400">services:</div>
        
        <div className="ml-4 space-y-1">
          <div className="text-green-400"># Primary Database</div>
          <div className="text-green-400">postgresql:</div>
          <div className="ml-4 space-y-1">
            <div className="text-amber-glow">image: postgres:15</div>
            <div className="text-amber-glow">environment:</div>
            <div className="ml-4 space-y-1">
              <div className="text-muted-foreground">POSTGRES_DB: production</div>
              <div className="text-muted-foreground">POSTGRES_USER: admin</div>
            </div>
          </div>

          <div className="text-green-400"># Search Engine</div>
          <div className="text-green-400">elasticsearch:</div>
          <div className="ml-4 space-y-1">
            <div className="text-amber-glow">image: elasticsearch:8.8</div>
            <div className="text-amber-glow">ports:</div>
            <div className="ml-4 text-muted-foreground">- "9200:9200"</div>
          </div>

          <div className="text-green-400"># Cache Layer</div>
          <div className="text-green-400">redis:</div>
          <div className="ml-4 space-y-1">
            <div className="text-amber-glow">image: redis:7-alpine</div>
            <div className="text-amber-glow">ports:</div>
            <div className="ml-4 text-muted-foreground">- "6379:6379"</div>
          </div>

          <div className="text-green-400"># Cloud Services</div>
          <div className="text-green-400">aws:</div>
          <div className="ml-4 space-y-1">
            <div className="text-amber-glow">services:</div>
            <div className="ml-4 space-y-1">
              <div className="text-muted-foreground">- ec2: compute-instances</div>
              <div className="text-muted-foreground">- s3: object-storage</div>
              <div className="text-muted-foreground">- rds: managed-database</div>
            </div>
          </div>

          <div className="text-green-400">azure:</div>
          <div className="ml-4 space-y-1">
            <div className="text-amber-glow">services:</div>
            <div className="ml-4 space-y-1">
              <div className="text-muted-foreground">- virtual-machines</div>
              <div className="text-muted-foreground">- blob-storage</div>
              <div className="text-muted-foreground">- sql-database</div>
            </div>
          </div>

          <div className="text-green-400"># Security & Networking</div>
          <div className="text-green-400">zscaler:</div>
          <div className="ml-4 space-y-1">
            <div className="text-amber-glow">type: zia-cloud</div>
            <div className="text-amber-glow">features:</div>
            <div className="ml-4 space-y-1">
              <div className="text-muted-foreground">- zero-trust-security</div>
              <div className="text-muted-foreground">- cloud-firewall</div>
              <div className="text-muted-foreground">- dns-filtering</div>
            </div>
          </div>
        </div>

        <div className="text-green-400">volumes:</div>
        <div className="ml-4 space-y-1">
          <div className="text-amber-glow">postgres_data:</div>
          <div className="text-amber-glow">elasticsearch_data:</div>
          <div className="text-amber-glow">redis_data:</div>
        </div>

        <div className="text-green-400">networks:</div>
        <div className="ml-4 space-y-1">
          <div className="text-amber-glow">backend-network:</div>
          <div className="ml-4 text-muted-foreground">driver: bridge</div>
        </div>
      </div>

      {/* Infrastructure Stats */}
      <div className="mt-6 pt-4 border-t border-terminal-border">
        <div className="text-green-400 font-bold mb-3 flex items-center">
          <i className="fas fa-cloud mr-2"></i>
          Infrastructure Metrics
        </div>
        <div className="text-xs space-y-2 ml-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Databases:</span>
            <span className="text-green-400">3 (PostgreSQL, Elasticsearch, Redis)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cloud Providers:</span>
            <span className="text-green-400">2 (AWS, Azure)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Security:</span>
            <span className="text-green-400">Zscaler ZIA Cloud</span>
          </div>
        </div>
      </div>
    </div>
  );
} 