import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Network, ChevronDown, ChevronRight, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export interface MLMNode {
  id: string;
  displayName: string;
  level: number;
  clicks: number;
  conversions: number;
  earned: number;
  children?: MLMNode[];
  joinedDate: string;
}

interface MLMTreeVisualizationProps {
  rootNode: MLMNode;
  maxDepth?: number;
}

function TreeNode({ node, depth, maxDepth }: { node: MLMNode; depth: number; maxDepth: number }) {
  const [isOpen, setIsOpen] = useState(depth < 2); // Auto-expand first 2 levels
  const hasChildren = node.children && node.children.length > 0;
  const canExpand = hasChildren && depth < maxDepth;

  const tierColors = [
    'bg-[#f7931a]/20 text-[#f7931a] border-[#f7931a]/30',
    'bg-[#00d4ff]/20 text-[#00d4ff] border-[#00d4ff]/30',
    'bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30',
  ];

  const tierColor = tierColors[node.level - 1] || 'bg-white/20 text-white border-white/30';

  return (
    <div className="relative">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div
          className="bg-black border border-white/10 rounded-lg p-3 hover:border-white/20 transition-colors"
          style={{ marginLeft: depth > 0 ? '24px' : '0' }}
        >
          <div className="flex items-start gap-3">
            {/* Expand/Collapse Button */}
            {canExpand && (
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-6 w-6 text-white/60 hover:text-white hover:bg-white/10"
                >
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            )}
            {!canExpand && hasChildren && (
              <div className="w-6" />
            )}

            {/* Node Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="truncate">{node.displayName}</span>
                <Badge className={tierColor}>
                  Level {node.level}
                </Badge>
                {hasChildren && (
                  <Badge variant="outline" className="border-white/20 text-white/60">
                    <Users className="w-3 h-3 mr-1" />
                    {node.children!.length}
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-secondary rounded px-2 py-1">
                  <div className="text-white/50">Clicks</div>
                  <div className="text-white">{node.clicks}</div>
                </div>
                <div className="bg-secondary rounded px-2 py-1">
                  <div className="text-white/50">Conv.</div>
                  <div className="text-[#14f195]">{node.conversions}</div>
                </div>
                <div className="bg-secondary rounded px-2 py-1">
                  <div className="text-white/50">Earned</div>
                  <div className="text-[#f7931a]">${node.earned.toFixed(0)}</div>
                </div>
              </div>

              <div className="text-xs text-white/40 mt-1">
                Joined: {new Date(node.joinedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        {canExpand && (
          <CollapsibleContent>
            <div className="mt-2 space-y-2">
              {node.children!.map((child) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                />
              ))}
            </div>
          </CollapsibleContent>
        )}
      </Collapsible>

      {/* Depth limit indicator */}
      {hasChildren && depth >= maxDepth && (
        <div
          className="text-xs text-white/40 mt-1"
          style={{ marginLeft: depth > 0 ? '24px' : '0' }}
        >
          + {node.children!.length} more at deeper levels...
        </div>
      )}
    </div>
  );
}

export function MLMTreeVisualization({ rootNode, maxDepth = 3 }: MLMTreeVisualizationProps) {
  const calculateTotals = (node: MLMNode): { clicks: number; conversions: number; earned: number; count: number } => {
    let totals = {
      clicks: node.clicks,
      conversions: node.conversions,
      earned: node.earned,
      count: 1
    };

    if (node.children) {
      node.children.forEach(child => {
        const childTotals = calculateTotals(child);
        totals.clicks += childTotals.clicks;
        totals.conversions += childTotals.conversions;
        totals.earned += childTotals.earned;
        totals.count += childTotals.count;
      });
    }

    return totals;
  };

  const totals = calculateTotals(rootNode);

  return (
    <Card className="bg-secondary border-white/10 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Network className="w-5 h-5 text-[#f7931a]" />
        <h3>MLM Network Overview</h3>
      </div>

      {/* Network Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-black border border-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
            <Users className="w-4 h-4" />
            Network Size
          </div>
          <div className="text-xl">{totals.count}</div>
        </div>
        <div className="bg-black border border-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Total Conversions
          </div>
          <div className="text-xl text-[#14f195]">{totals.conversions}</div>
        </div>
        <div className="bg-black border border-white/10 rounded-lg p-3">
          <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
            <DollarSign className="w-4 h-4" />
            Network Earnings
          </div>
          <div className="text-xl text-[#f7931a]">${totals.earned.toFixed(2)}</div>
        </div>
        <div className="bg-black border border-white/10 rounded-lg p-3">
          <div className="text-white/60 text-sm mb-1">Depth Shown</div>
          <div className="text-xl">{maxDepth} Levels</div>
        </div>
      </div>

      {/* Tree Structure */}
      <div className="space-y-2">
        <div className="text-sm text-white/60 mb-3">
          Your Referral Network (showing up to {maxDepth} levels)
        </div>
        <TreeNode node={rootNode} depth={0} maxDepth={maxDepth} />
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
        💡 Click on nodes to expand/collapse. Earnings shown are commissions earned by each member.
      </div>
    </Card>
  );
}
