<?php
/*
 * TagRepository.php
 * Copyright (c) 2024 james@firefly-iii.org
 *
 * This file is part of Firefly III (https://github.com/firefly-iii).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

declare(strict_types=1);

namespace FireflyIII\Repositories\UserGroups\Tag;

use FireflyIII\Support\Repositories\UserGroup\UserGroupTrait;
use Illuminate\Database\Eloquent\Builder as EloquentBuilder;
use Illuminate\Support\Collection;

/**
 * Class TagRepository
 */
class TagRepository implements TagRepositoryInterface
{
    use UserGroupTrait;

    public function searchTag(array $query, int $limit): Collection
    {
        $search = $this->userGroup->tags();
        if (count($query) > 0) {
            // split query on spaces just in case:
            $search->where(function (EloquentBuilder $q) use ($query) {
                foreach ($query as $line) {
                    $parts = explode(' ', $line);
                    foreach ($parts as $part) {
                        $search = sprintf('%%%s%%', $part);
                        $q->orWhere('tag', 'LIKE', $search);
                    }
                }
            });
        }

        return $search->take($limit)->get(['tags.*']);
    }
}
